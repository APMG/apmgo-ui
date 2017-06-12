import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainMenu from './components/MainMenu.react'
import Playlist from './components/playlist/Playlist'
import playlistReducer, { initializePlaylist } from './redux/playlist'
import { Provider } from 'react-redux'

const apm_account = new ApmAccount('/apm_accounts')
if(!apm_account.is_logged_in()) {
  window.location.href = apm_account.log_in_path()
}

// Improved tap events
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./redux/root-saga"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

let store = createStore(
  playlistReducer,
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
      store.dispatch( initializePlaylist(apm_account.get_token()) )
    })
    .catch(function (error) {
      // TODO: Error handling
      console.error('Could not refresh access token')
    })
} else {
  store.dispatch( initializePlaylist(apm_account.get_token()) )
}

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
