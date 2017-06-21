// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import type { PlaylistItemType } from '../../redux/types'
import AudioPlayer from '../player/AudioPlayer'

type TimelineListProps = {
  data: Array<PlaylistItemType>,
  activeItem?: PlaylistItemType
}

interface TimelineListState {}

class Playlist extends React.Component {

  currentTrack: PlaylistItemType

  constructor(props) {
    super(props)
  }

  render () {
    if (!this.props.data) {
      return <h1>Loading ...</h1>
    }
    if (!this.props.data.length) {
      return <h1>Your playlist is empty</h1>
    }
    return (
      <div>
        <AudioPlayer item/>
        <List>
          {this.props.data.map((item, i) =>
            <PlaylistItem item={item} key={i} />
          )}
        </List>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  let playlistItems = state.data.data

  return { data: playlistItems }
}

const PlaylistContainer = connect(
  mapStateToProps
)(Playlist)

export default PlaylistContainer
