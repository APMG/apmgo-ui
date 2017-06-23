// @flow
import * as React from 'react'
import { Component } from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AudioPlayerState from '../../models/AudioPlayerState'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export const itemFixtures = [
  {
    "id": 1,
    "attributes": {
      "audio-title": 'Test Audio',
      "audio-url": 'https://play.publicradio.org/api-2.0.1/o/phc/2017/06/17/phc_20170617_128.mp3'
    }
  },
  {
    "id": 2,
    "attributes": {
      "audio-title": 'Another Test Audio',
      "audio-url": 'https://play.publicradio.org/api-2.0.1/o/phc/2017/06/17/phc_20170617_128.mp3'
    }
  }
]

export const defaultTestState = {
  data: itemFixtures,
  audioPlayer: new AudioPlayerState({currentTrackId: 1})
}

export default function getSnapshotJson(Component: Component<*,*,*>, customTestState?: any = {}) {
  let renderedComponent = getRenderedComponent(Component, customTestState),
      tree = renderedComponent.toJSON();
    return tree
}

export function getRenderedComponent(Component: Component<*,*,*>, customTestState?: any = {}) {
  let store = getMockStore(customTestState),
      component = renderer.create(
        <MuiThemeProvider>
          <Provider store={store}>
            { Component }
          </Provider>
        </MuiThemeProvider>
      )

    return component
}

export function getMockStore(customTestState?: any = {}) {
  let mockStore = configureStore(),
      initialState = getInitialState(customTestState),
      store = mockStore(initialState)

  return store
}

export function getInitialState(customTestState?: any = {}) {
  return Object.assign(defaultTestState, customTestState)
}
