// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import MainMenu from '../lib/components/MainMenu.react'
import Playlist from '../lib/components/playlist/Playlist'
import { initializePlaylist } from '../lib/redux/playlist'
import { PlaylistItemType } from '../lib/redux/types'
import { Provider, connect } from 'react-redux'
import { BragiItemChannelSubscription } from '../lib/service/cable'
import apmAccount from '../lib/service/apm-account'
import { DragDropContext } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import ApmHTML5toTouch from '../lib/drag-drop/ApmHTML5toTouch'
import store from '../lib/redux/store'

import '../lib/styles/global.scss'

// Improved tap events
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

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
      <div>
        <MainMenu name={apmAccount.get_name()} logoutPath={apmAccount.log_out_path()} />
        <Playlist playlist={this.props.playlist} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist
  }
}
const DNDApp = DragDropContext(MultiBackend(ApmHTML5toTouch))(AppPresenter)
const App = connect(mapStateToProps)(DNDApp)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    window.document.body.appendChild(document.createElement('div'))
  )
})
