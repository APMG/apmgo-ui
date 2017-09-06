// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import MainMenu from '../lib/components/MainMenu.react'
import Playlist from '../lib/components/playlist/Playlist'
import playlistReducer, { initializePlaylist } from '../lib/redux/playlist'
import playerReducer from '../lib/redux/audio-player'
import dataReducer from '../lib/redux/data'
import { PlaylistItemType } from '../lib/redux/types'
import { Provider, connect } from 'react-redux'
import { BragiItemChannelSubscription } from '../lib/service/cable'
import apmAccount from '../lib/service/apm-account'
import { DragDropContextProvider } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import ApmHTML5toTouch from '../lib/drag-drop/ApmHTML5toTouch'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../lib/redux/root-saga'

import '../lib/styles/global.scss'

// Improved tap events
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

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
if (apmAccount.get_expires_at() < Date.now()) {
  apmAccount.refresh()
    .then(function (token) {
      store.dispatch(initializePlaylist())
    })
    .catch(error => {
      // TODO: Error handling
      console.error('Could not refresh access token')
      throw new Error('Could not refresh access token')
    })
} else {
  store.dispatch(initializePlaylist())
}

BragiItemChannelSubscription.initiateSubscription(apmAccount.get_token())

type AppPresenterProps = {
  playlist: Array<PlaylistItemType>
}

class AppPresenter extends React.Component {
  props: AppPresenterProps

  render () {
    return (
      <DragDropContextProvider backend={MultiBackend(ApmHTML5toTouch)}>
        <div>
          <MainMenu name={apmAccount.get_name()} logoutPath={apmAccount.log_out_path()} />
          <Playlist playlist={this.props.playlist} />
        </div>
      </DragDropContextProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist
  }
}

const App = connect(mapStateToProps)(AppPresenter)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    window.document.body.appendChild(document.createElement('div'))
  )
})
