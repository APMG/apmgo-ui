import React, { Component } from 'react'
import PlaylistItemPresenter from './PlaylistItemPresenter'
import DraggablePlaylistItem from './DraggablePlaylistItem'
import { getInitialState } from '../../../__tests__/testHelpers'

import TestUtils from 'react-dom/test-utils'
import { DragDropContext } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'

const initialState = getInitialState()

describe('Playlist Item drag and drop', function () {
  function wrapInTestContext (DecoratedComponent) {
    return DragDropContext(TestBackend)(
      class TestContextContainer extends Component {
        render () {
          return <DecoratedComponent {...this.props} />
        }
      }
    )
  }

  it('responds to dragging events', function () {
    const testProps = {
      playlistItemMoved: jest.fn(),
      item: initialState.data[0]
    }
    const ItemContext = wrapInTestContext(DraggablePlaylistItem)
    const root = TestUtils.renderIntoDocument(<ItemContext {...testProps} />)
    const backend = root.getManager().getBackend()

    let handler = [TestUtils.findRenderedComponentWithType(root, DraggablePlaylistItem).getHandlerId()]
    let presenter = TestUtils.findRenderedComponentWithType(root, PlaylistItemPresenter)
    expect(presenter.props.isDragging).toBe(false)

    backend.simulateBeginDrag(handler)
    expect(presenter.props.isDragging).toBe(true)
    backend.simulateEndDrag(handler)
    expect(presenter.props.isDragging).toBe(false)
    expect(testProps.playlistItemMoved).toHaveBeenCalled()
  })
})
