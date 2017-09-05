// @flow
import React from 'react'
import DragLayer from 'react-dnd/lib/DragLayer'

type PlaylistItemDragPreviewProps = {
  id: number,
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

  // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  var x = currentOffset.x
  var y = currentOffset.y
  var transform = `translate(${x}px, ${y}px)`

  return {
    pointerEvents: 'none',
    transform: transform,
    WebkitTransform: transform
  }
}

function PlaylistItemDragPreview (props: PlaylistItemDragPreviewProps) {
  if (!props.isDragging) {
    return null
  }

  let result = (
    <div>
      <h1>Drag Preview!!!</h1>
    </div>
  )
  console.log(result)
  return result
}

export default DragLayer(collect)(PlaylistItemDragPreview)
