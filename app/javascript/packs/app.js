import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainMenu from '../lib/components/MainMenu.react'
import Playlist from '../lib/components/playlist/Playlist'
import playlistReducer, { initializePlaylist } from '../lib/redux/playlist'
import playerReducer from '../lib/redux/audio-player'
import dataReducer from "../lib/redux/data"
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { BragiItemChannelSubscription } from '../lib/service/cable'
import apm_account from '../lib/service/apm-account'

// Improved tap events
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../lib/redux/root-saga"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

let store = createStore(
  combineReducers({
    data: dataReducer,
    playlist: playlistReducer,
    audioPlayer: playerReducer
  }),
  enhancer
)

// The root saga is composed of all the app's individual
// listener sagas - any saga that begins with "take", "takeEvery" or "takeLatest"
// this bootstraps it onto the sagaMiddleware
sagaMiddleware.run(rootSaga)

// Verify we have a current auth token, then fetch data
if(apm_account.get_expires_at() < Date.now()) {
  apm_account.refresh()
    .then(function (token) {
      store.dispatch( initializePlaylist() )
    })
    .catch(function (error) {
      // TODO: Error handling
      console.error('Could not refresh access token')
    })
} else {
  store.dispatch( initializePlaylist() )
}

BragiItemChannelSubscription.initiateSubscription(apm_account.get_token())

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <div>
        <MainMenu name={apm_account.get_name()} logoutPath={apm_account.log_out_path()} />
        <Playlist />
      </div>
    </Provider>
  </MuiThemeProvider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
