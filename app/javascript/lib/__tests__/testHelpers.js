// @flow
import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AudioPlayerState from '../models/AudioPlayerState'

export const itemFixtures = [
  {
    'id': 1,
    'attributes': {
      'audio_title': 'Test Audio',
      'audio_url': 'https://play.publicradio.org/api-2.0.1/o/phc/2017/06/17/phc_20170617_128.mp3',
      'playtime': 30,
      'audio_description': 'Nice description you have there ...'
    }
  },
  {
    'id': 2,
    'attributes': {
      'audio_title': 'Another Test Audio',
      'audio_url': 'https://play.publicradio.org/api-2.0.1/o/phc/2017/06/17/phc_20170617_128.mp3',
      'playtime': 60,
      'audio_description': 'How shall I describe thee?'
    }
  }
]

export const defaultTestState = {
  data: itemFixtures,
  audioPlayer: new AudioPlayerState({currentTrackId: itemFixtures[0].id})
}

export function getSnapshotJson (Component: Component<*, *, *> | React$Element<*>, customTestState?: any = {}) {
  let renderedComponent = getRenderedComponent(Component, customTestState)
  let tree = renderedComponent.toJSON()
  return tree
}

export function getRenderedComponent (Component: Component<*, *, *> | React$Element<*>, customTestState?: any = {}) {
  let wrappedComponent = getWrappedComponent(Component, customTestState)

  return renderer.create(wrappedComponent)
}

export function getWrappedComponent (Component: Component<*, *, *> | React$Element<*>, customTestState?: any = {}) {
  let store = getMockStore(customTestState)
  return wrapComponent(Component, store)
}

export function wrapComponent (Component: Component<*, *, *> | React$Element<*>, store: any) {
  return (
    <Provider store={store}>
      {Component}
    </Provider>
  )
}

export function getMockStore (customTestState?: any = {}) {
  let mockStore = configureStore()
  let initialState = getInitialState(customTestState)
  let store = mockStore(initialState)

  return store
}

export function getInitialState (customTestState?: any = {}) {
  return Object.assign({}, defaultTestState, customTestState)
}
