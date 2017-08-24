// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import type { PlaylistItemType } from '../../redux/types'
import AudioPlayer from '../player/AudioPlayer'
import { changeTrack } from '../../redux/audio-player'
import { playlistItemMoved } from '../../redux/data'

type PlaylistProps = {
  playlist: Array<PlaylistItemType>,
  activeItem?: PlaylistItemType,
  itemMoved: (item: PlaylistItemType, newPosition:number) => {}
}

interface TimelineListState {}

export class PlaylistPresenter extends React.Component {

  constructor(props: PlaylistProps) {
    super(props)
  }

  render () {
    if (!this.props.playlist || !this.props.playlist.length) {
      return <h1>Loading ...</h1>
    }
    return (
      <div>
        <AudioPlayer item={this.props.activeItem}/>
        <ul>
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
        </ul>
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

const mapDispatchToProps = (dispatch) => {
  return {
    itemMoved: (item: PlaylistItemType, newPosition: number) => {
      let newAfter =
      dispatch(playlistItemMoved(from, to))
    }
  }
}

const PlaylistContainer = connect(
  mapStateToProps
)(PlaylistPresenter)

export default PlaylistContainer
