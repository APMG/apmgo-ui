// @flow
import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import PlaylistItemPresenter from './PlaylistItemPresenter'
import { DraggableItemTypes } from '../../../drag-drop/Constants'
import { PlaylistItemType } from '../../../redux/types'

const playlistItemSource = {
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

function sourceCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

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

class DraggablePlaylistItem extends Component {
  props: DraggablePlaylistItemProps

  componentDidMount () {
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    })
  }

  render () {
    return this.props.connectDragSource(
      <div>
        <PlaylistItemPresenter {...this.props} />
      </div>
    )
  }
}

export default DragSource(
  DraggableItemTypes.PLAYLIST_ITEM,
  playlistItemSource,
  sourceCollect
)(DraggablePlaylistItem)
