// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import PlaylistItem, { PlaylistItemDragPreview } from './PlaylistItem'
import { DraggableItemTypes } from '../../drag-drop/Constants'
import VerticalScrollingList from './VerticalScrollingList'
import type { PlaylistItemType } from '../../redux/types'
import AudioPlayer from '../player/AudioPlayer'
import { playlistItemMoved } from '../../redux/data'

import './Playlist.scss'

type PlaylistProps = {
  playlist: Array<PlaylistItemType>,
  activeItem?: PlaylistItemType,
  playlistItemMoved: (item: PlaylistItemType, newPosition: number) => {}
}

export class PlaylistPresenter extends React.Component {
  props: PlaylistProps

  render () {
    if (!this.props.playlist || !this.props.playlist.length) {
      return <h1>Loading ...</h1>
    }
    return (
      <div>
        <AudioPlayer item={this.props.activeItem} />
        <VerticalScrollingList>
          {this.props.playlist
            .filter(item => !item.attributes.finished)
            .map((item, i) =>
              <PlaylistItem
                playlistItemMoved={this.props.playlistItemMoved}
                item={item}
                index={i}
                key={item.id}
              />
            )

          }
          <PlaylistItemDragPreview
            item={DraggableItemTypes.PLAYLIST_ITEM}
            key='__preview'
          />
        </VerticalScrollingList>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeItem = ownProps.playlist.find(item => item.id === state.audioPlayer.currentTrackId)

  if (!activeItem) {
    activeItem = ownProps.playlist.find((item: PlaylistItemType) => {
      return !item.attributes.finished
    })
  }

  return {
    activeItem: Object.assign({}, activeItem)
  }
}

const mapDispatchToProps = (dispatch: (action: any) => {}, ownProps) => {
  return {
    playlistItemMoved: (item: PlaylistItemType, newPosition: number) => {
      let newAfter = ownProps.playlist[newPosition - 1]

      newAfter = newAfter ? newAfter.id : null

      dispatch(playlistItemMoved(item, newAfter))
    }
  }
}

const PlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPresenter)

export default PlaylistContainer
