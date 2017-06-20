import * as React from 'react'
import { connect } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import { PlaylistItemType } from '../../redux/types'

interface TimelineListProps {
  data: Array<PlaylistItemType>
}

interface TimelineListState {}

class Playlist extends React.Component<TimelineListProps, TimelineListState> {
  constructor(props) {
    super(props)
  }

  render () {
    if (!this.props.data) {
      return <h1>Loading ...</h1>
    }
    return (
      <List>
        {this.props.data.map((item, i) =>
          <PlaylistItem item={item} key={i} />
        )}
      </List>
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
