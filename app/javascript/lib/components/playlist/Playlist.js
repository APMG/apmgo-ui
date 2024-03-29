// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Preview } from 'react-dnd-multi-backend'

import ItemSlot from './ItemSlot'
import PlaylistItem, { type PlaylistItemProps } from './PlaylistItem'
import { type PlaylistItemBeingDragged } from './PlaylistItem/DraggablePlaylistItem'
import PlaylistItemPresenter from './PlaylistItem/PlaylistItemPresenter'
import VerticalScrollingList from './VerticalScrollingList'
import type { PlaylistItemType } from '../../redux/types'
import AudioPlayer from '../player/AudioPlayer'
import { playlistItemMoved } from '../../redux/data'

import './Playlist.scss'

type PlaylistProps = {
  playlist: Array<PlaylistItemType>,
  activeItem?: PlaylistItemType,
  nextItem?: PlaylistItemType,
  playlistItemMoved: (item: PlaylistItemType, newPosition: number) => {}
}

function makePreviewProps (item: PlaylistItemBeingDragged, style: any): PlaylistItemProps {
  const stubFunk = (item: PlaylistItemType) => {}
  return {
    item: item.item,
    style: style,
    index: item.origIndex,
    deleteTrack: stubFunk,
    play: () => {},
    archiveTrack: stubFunk,
    playlistItemMoved: stubFunk,
    setTrackAsActive: stubFunk
  }
}

function generatePreview (type: string, item: any, style: any) {
  const props = makePreviewProps(item, style)
  return <PlaylistItemPresenter {...props} />
}

export class PlaylistPresenter extends React.Component {
  props: PlaylistProps

  render () {
    if (!this.props.playlist || !this.props.playlist.length) {
      return <p>Loading YOUR playlist</p>
    }
    return (
      <div>
        <AudioPlayer
          item={this.props.activeItem}
          nextItem={this.props.nextItem}
        />
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
        </VerticalScrollingList>
        <Preview generator={generatePreview} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeItem = ownProps.playlist.find(item => item.id === state.audioPlayer.currentTrackId)
  let nextItem

  if (!activeItem) {
    activeItem = ownProps.playlist.find((item: PlaylistItemType) => {
      return !item.attributes.finished
    })
  }

  if (activeItem) {
    nextItem = ownProps.playlist.find((item: PlaylistItemType) => {
      return !item.attributes.finished && (item.id !== activeItem.id)
    })
  }

  return {
    activeItem: activeItem,
    nextItem: nextItem
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
