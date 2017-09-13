// @flow
import React from 'react'
import { connect } from 'react-redux'
import { changeTrack, playClick } from '../../../redux/audio-player'
import { archivePlaylistItem, removePlaylistItem } from '../../../redux/playlist'

import { PlaylistItemType } from '../../../redux/types'
import DraggablePlaylistItem from './DraggablePlaylistItem'

export type PlaylistItemProps = {
  item: PlaylistItemType,
  index: number,
  setTrackAsActive: (item: PlaylistItemType) => {},
  archiveTrack: (item: PlaylistItemType) => {},
  deleteTrack: (item: PlaylistItemType) => {},
  play: () => {},
  playlistItemMoved: (item: PlaylistItemType, newIndex: number) => {},
  style?: any
}

const PlaylistItem = (props: PlaylistItemProps) => {
  return <DraggablePlaylistItem {...props} />
}

const mapDispatchToProps = (dispatch: (action: any) => {}, ownProps) => {
  return {
    setTrackAsActive: (event) => {
      dispatch(changeTrack(ownProps.item))
    },
    archiveTrack: () => {
      dispatch(archivePlaylistItem(ownProps.item))
    },
    deleteTrack: () => {
      dispatch(removePlaylistItem(ownProps.item.id))
    },
    play: () => {
      dispatch(playClick(ownProps.item.id))
    }
  }
}

export default connect(null, mapDispatchToProps)(PlaylistItem)
