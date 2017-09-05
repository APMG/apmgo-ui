// @flow
import React from 'react'
import DragLayer from 'react-dnd/lib/DragLayer'
import { PlaylistItemType } from '../../../redux/types'

type PlaylistItemDragPreviewProps = {
  item: PlaylistItemType,
  // id: number,
  currentOffset: {x: number, y: number},
  isDragging: boolean
}

function collect (monitor, props) {
  var item = monitor.getItem()
  return {
    id: item && item.id,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

function getItemStyles (currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  return {
    position: 'absolute',
    top: currentOffset.y,
    left: currentOffset.x
  }
}

function PlaylistItemDragPreview (props: PlaylistItemDragPreviewProps) {
  if (!props.isDragging) {
    return null
  }

  return (
    <div style={getItemStyles(props.currentOffset)}>
      <h1>Drag Preview!!!</h1>
    </div>
  )
}

export default DragLayer(collect)(PlaylistItemDragPreview)
