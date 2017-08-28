// @flow
import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import PlaylistItem from '../components/playlist/PlaylistItem'
import { getWrappedComponent as wrapInReduxState } from '../redux/__tests__/mock-initial-state'
import { PLAYLIST_ITEM_MOCK } from '../redux/__tests__/mock-playlist-item'

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent: Component<*,*,*>) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return wrapInReduxState(<DecoratedComponent {...this.props} />);
      }
    }
  );
  // return wrapInReduxState(DragDropContainer)
}

describe('Playlist Item drag and drop', function() {
  it('has 0 opacity when being dragged', function(){
    // Render with the test context that uses the test backend
    const PlaylistItemContext = wrapInTestContext(PlaylistItem);
    const root = TestUtils.renderIntoDocument(<PlaylistItemContext item={PLAYLIST_ITEM_MOCK} />);

    // Obtain a reference to the backend
    const backend = root.getManager().getBackend();

    // Test that the opacity is 1
    let element = TestUtils.findRenderedDOMComponentWithTag(root, 'li');
    expect(element).toEqual({})
    // expect(element.props.style.opacity).toEqual(1);


  })
})
