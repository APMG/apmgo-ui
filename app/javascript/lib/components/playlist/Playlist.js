// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import List from 'material-ui/List'
import type { PlaylistItemType } from '../../redux/types'
import AudioPlayer from '../player/AudioPlayer'
import Async from 'react-code-splitting'
import { changeTrack } from '../../redux/audio-player'

type PlaylistProps = {
  data: Array<PlaylistItemType>,
  activeItem?: PlaylistItemType
}

interface TimelineListState {}

export class PlaylistPresenter extends React.Component {

  constructor(props: PlaylistProps) {
    super(props)
  }

  render () {
    if (!this.props.data || !this.props.data.length) {
      return <h1>Loading ...</h1>
    }
    return (
      <div>
        <AudioPlayer item={this.props.activeItem}/>
        <List>
          {this.props.data
            .filter(item => !item.attributes.finished)
            .map((item, i) => <PlaylistItem item={item} key={i} />)
          }
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let activeItem = state.playlist.find(item => item.id === state.audioPlayer.currentTrackId)

  if (!activeItem) {
    activeItem = state.playlist.find((item: PlaylistItemType) => {
      return !item.attributes.finished
    })
  }

  return {
    data: state.playlist,
    activeItem: Object.assign({}, activeItem)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playTrack: (item) => {
      dispatch(changeTrack(item))
    }
  }
}

const PlaylistContainer = connect(
  mapStateToProps
)(PlaylistPresenter)

export default PlaylistContainer
