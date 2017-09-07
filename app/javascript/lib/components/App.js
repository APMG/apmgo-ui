// @flow
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'

import store from '../redux/store'
import ApmHTML5toTouch from '../drag-drop/ApmHTML5toTouch'
import MainMenu from './MainMenu.react'
import Playlist from './playlist/Playlist'
import { PlaylistItemType } from '../redux/types'

type AppPresenterProps = {
  playlist: Array<PlaylistItemType>,
  accountName: string,
  logoutPath: string
}

class AppPresenter extends Component {
  props: AppPresenterProps

  render () {
    return (
      <Provider store={store}>
        <div className="container">
          <MainMenu
            name={this.props.accountName}
            logoutPath={this.props.logoutPath}
          />
          <Playlist playlist={this.props.playlist} />
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist
  }
}

const DNDApp = DragDropContext(MultiBackend(ApmHTML5toTouch))(AppPresenter)
const ReduxedApp = connect(mapStateToProps)(DNDApp)

type AppProps = {
  accountName: string,
  logoutPath: string
}

const App = (props: AppProps) => {
  return (
    <Provider store={store}>
      <ReduxedApp {...props} />
    </Provider>
  )
}

export default App
