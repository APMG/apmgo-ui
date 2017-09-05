// @flow
import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'
import PlaylistItemDragPreview from './PlaylistItem/PlaylistItemDragPreview'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

type PlaylistCustomDragLayerProps = {
  item: any,
  initialOffset: {
    x: number,
    y: number,
  },
  currentOffset: {
    x: number,
    y: number
  },
  isDragging: boolean,
  snapToGrid: boolean,
}

function getItemStyles (props: PlaylistCustomDragLayerProps) {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }

  let { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

class PlaylistCustomDragLayer extends Component {
  props: PlaylistCustomDragLayerProps

  render () {
    const { item, isDragging } = this.props

    if (!isDragging) {
      return null
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          <PlaylistItemDragPreview item={item} />
        </div>
      </div>
    )
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(PlaylistCustomDragLayer)
