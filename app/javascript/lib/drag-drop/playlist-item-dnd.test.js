import React, { Component } from 'react'
import PlaylistItem, { PlaylistItemPresenter } from '../components/playlist/PlaylistItem'
import { configureDD } from './playlist-item'
import { renderComponent, getInitialState } from '../__tests__/testHelpers'

import TestUtils from 'react-addons-test-utils'
import { DragDropContext } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'

const initialState = getInitialState()

describe('Playlist Item drag and drop', function () {
  let manager
  let backend
  const DDPlaylistItem = configureDD(PlaylistItemPresenter)

  const Draggable = props => (
    <div>
      <DDPlaylistItem {...props} />
    </div>
  )

  const source = component => {
    return component.find(DDPlaylistItem)[0].handler.monitor.sourceId
  }
  const target = component => {
    return component.find(DDPlaylistItem)[0].handler.monitor.targetId
  }

  function render (props) {
    const renderInfo = renderComponent(Draggable, {
      ...{item: initialState.data[0]},
      ...props
    }, {}, true)

    manager = renderInfo[3].getManager()
    backend = manager.getBackend()
    return renderInfo[0]
  }

  function wrapInTestContext (DecoratedComponent) {
    return DragDropContext(TestBackend)(
      class TestContextContainer extends Component {
        render () {
          return <DecoratedComponent {...this.props} />
        }
      }
    )
  }

  xit('exists on the page', function () {
    // Render with the test context that uses the test backend
    const component = render()
    expect(component.find('li').length).toBe(1)
    // expect(element.props.style.opacity).toEqual(1);
  })
  it('can use react-utils', function () {
    const ItemContext = wrapInTestContext(configureDD(PlaylistItemPresenter))
    const root = TestUtils.renderIntoDocument(<ItemContext item={initialState.data[0]} />)
    const backend = root.getManager().getBackend()

    expect(backend).toBeTruthy()
    let div = TestUtils.findRenderedDOMComponentWithTag(root, 'li')
    expect(div).toEqual(1)

    let item = TestUtils.findRenderedComponentWithType(root, PlaylistItemPresenter)
    expect(item.props.isDragging).toBe(false)
    backend.simulateBeginDrag([item.getHandlerId()])
    expect(item.props.isDragging).toBe(true)
  })

  xit('has opacity of 0 when dragging', function () {
    const component = render()
    let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
    expect(div.props.style.opacity).toEqual(1)
    // expect(source(component)).toBe(true)
    // expect(component.find(DDPlaylistItem).props('isDragging')).not.toBeTruthy()
    backend.simulateBeginDrag([source(component)])
    backend.simulateHover([target(component)])
    expect(component.find(DDPlaylistItem).props('isDragging')).toBe(true)
    const element = component.find('li')
    expect(element.props('style').opacity).toBe(0)
  })
  xit('has opacity of 1 when not dragging', function () {
    const component = render({isDragging: false})
    const element = component.find('li')
    expect(element.props('style').opacity).toBe(1)
  })
})
