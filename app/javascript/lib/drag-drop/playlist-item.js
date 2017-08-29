// @flow
// import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { type PlaylistItemProps } from '../components/playlist/PlaylistItem'
import { DraggableItemTypes } from './Constants'

const playlistItemSource = {
  beginDrag (props: PlaylistItemProps) {
    return {
      item: props.item,
      index: props.index,
      origIndex: props.index
    }
  },

  endDrag (props: PlaylistItemProps, monitor, component) {
    props.playlistItemMoved(props.item, props.index)
  }
}

function sourceCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
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

function targetCollect (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const playlistItemTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    const componentDOMNode = findDOMNode(component)

    if (!(componentDOMNode)) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = componentDOMNode.getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.movePlaylistItem(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

export function configureDroppable (playlistItem: any) {
  return DropTarget(
    DraggableItemTypes.PLAYLIST_ITEM,
    playlistItemTarget,
    targetCollect
  )(playlistItem)
}

export function configureDD (item: any) {
  return configureDraggable(configureDroppable(configureDraggable(item)))
}
