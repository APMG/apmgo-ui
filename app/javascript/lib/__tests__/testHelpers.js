// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-test-backend'

// import TestBackend from 'react-dnd-test-backend'
import teaspoon from 'teaspoon'

import { getMockStore, defaultTestState } from '../redux/__tests__/mock-initial-state'

export function renderComponent (ComponentClass: any, props: any = {}, state: any = {}, returnStore: boolean = false) {
  const store = getMockStore()
  const log = []
  const logger = store => next => action => {
    log.push(action)
    return next(action)
  }

  const DD = DragDropContext(HTML5Backend)

  class Tester extends Component {
    constructor (props) {
      super(props)
      this.state = props
    }

    componentWillReceiveProps (props) {
      if (props !== this.props) {
        this.setState(props)
      }
    }
    render () {
      return (
        <Provider store={store}>
          <ComponentClass {...this.state} />
        </Provider>
      )
    }
  }

  const Draggable = DD(Tester)

  const ret = teaspoon(
    <Draggable {...props} />
  ).render()

  if (returnStore) {
    return [ret, store, log, Draggable.prototype]
  }

  return ret
}

export function getInitialState (customTestState?: any = {}) {
  return Object.assign({}, defaultTestState, customTestState)
}
