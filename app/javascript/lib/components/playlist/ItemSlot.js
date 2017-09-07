// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { DraggableItemTypes } from '../../drag-drop/Constants'
import { movePlaylistItem } from '../../redux/playlist'

type ItemSlotProps = {
  index: number,
  isOver: boolean,
  canDrop: boolean,
  children: Array<Component<*, *, *>>,
  connectDropTarget: (rendered: any) => {},
  movePlaylistItem: (fromIndex: number, toIndex: number) => {}
}

const ItemSlot = (props: ItemSlotProps) => {
  return props.connectDropTarget(
    <li style={{height: '90px', maxHeight: '90px', marginBottom: '5px'}}>
      <div style={{display: props.isOver ? 'none' : 'block'}}>
        { props.children }
      </div>
    </li>
  )
}

const target = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
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

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

const droppable = DropTarget(
  DraggableItemTypes.PLAYLIST_ITEM,
  target,
  collect
)(ItemSlot)

const mapDispatchToProps = (dispatch: (action: any) => {}) => {
  return {
    movePlaylistItem: (from: number, to: number) => {
      dispatch(movePlaylistItem(from, to))
    }
  }
}

const reduxConnected = connect(null, mapDispatchToProps)(droppable)

export default reduxConnected
