// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Preview } from 'react-dnd-multi-backend'

import ItemSlot from './ItemSlot'
import PlaylistItem, { PlaylistItemDragPreview } from './PlaylistItem'
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

function generatePreview (type: string, item: any, style: any) {
  return <PlaylistItemDragPreview
    item={item.item}
    style={style}
  />
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
              <ItemSlot key={item.attributes.audio_identifier} index={i}>
                <PlaylistItem
                  playlistItemMoved={this.props.playlistItemMoved}
                  item={item}
                  index={i}
                />
              </ItemSlot>
            )
          }
          <Preview generator={generatePreview} />
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
