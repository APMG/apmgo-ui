// @flow
import { DragSource } from 'react-dnd'
import { type PlaylistItemProps } from './PlaylistItem'
import { DraggableItemTypes } from '../../../drag-drop/Constants'

const playlistItemSource = {
  beginDrag (props: PlaylistItemProps) {
    return {
      item: props.item,
      index: props.index,
      origIndex: props.index
    }
  },

  endDrag (props, monitor, component) {
    if (monitor.didDrop()) {
      props.playlistItemMoved(props.item, props.index)
    }
  }
}

function sourceCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export function configureDraggable (playlistItem: any) {
  return DragSource(
    DraggableItemTypes.PLAYLIST_ITEM,
    playlistItemSource,
    sourceCollect
  )(playlistItem)
}

export function configureDD (item: any) {
  return configureDraggable(item)
}
