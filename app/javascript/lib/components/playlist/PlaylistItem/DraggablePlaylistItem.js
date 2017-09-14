// @flow
import React from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import PlaylistItemPresenter from './PlaylistItemPresenter'
import { DraggableItemTypes } from '../../../drag-drop/Constants'
import { PlaylistItemType } from '../../../redux/types'

export type PlaylistItemBeingDragged = {
  item: PlaylistItemType,
  style: any,
  index: number,
  origIndex: number
}

// In the spec here, specify how the Drag Source
// i.e., the "thing being dragged", should
// respond to various dragging events
const dragSourceSpec = {
  // beginDrag is always required. The object
  // returned here will represent the dragged
  // item in react-dnd's internal redux state
  // (I think ~EN)
  beginDrag (props: any) {
    return {
      item: props.item,
      index: props.index,
      origIndex: props.index
    }
  },

  endDrag (props, monitor, component) {
    props.playlistItemMoved(props.item, props.index)
  }
}

// Much like redux `mapStateToProps` and `mapDispatchToProps`
// the object returned from the "collect" function will
// be assigned to the Drag Source item's props
function dragSourceCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

// Most of these props are not used here but are
// passed down from this "Draggable" wrapper
// to the child PlaylistItemPresenter
type DraggablePlaylistItemProps = {
  item: PlaylistItemType,
  connectDragSource: (e: React$Element<*>) => ?React$Element<*>,
  connectDragPreview: (e: Image, options: any) => ?Image,
  isDragging: boolean,
  index: number,
  playlistItemMoved: (item: PlaylistItemType, newIndex: number) => {},
  setTrackAsActive: (item: PlaylistItemType) => {},
  archiveTrack: (item: PlaylistItemType) => {},
  deleteTrack: (item: PlaylistItemType) => {},
  play: () => {},
}

const DraggablePlaylistItem = (props: DraggablePlaylistItemProps) => {
  props.connectDragPreview(getEmptyImage(), {
    // IE fallback: specify that we'd rather screenshot the node
    // when it already knows it's being dragged so we can hide it with CSS.
    captureDraggingState: true
  })
  return props.connectDragSource(
    <div>
      <PlaylistItemPresenter {...props} />
    </div>
  )
}

export default DragSource(
  DraggableItemTypes.PLAYLIST_ITEM,
  dragSourceSpec,
  dragSourceCollect
)(DraggablePlaylistItem)
