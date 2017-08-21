// @flow
import * as React from 'react'
import { connect, dispatch } from 'react-redux'

import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'

import {
  grey400,
  lightBlue400,
  red50,
  red700
} from 'material-ui/styles/colors'

import type { PlaylistItemType } from '../../redux/types'
import { changeTrack, playClick } from '../../redux/audio-player'
import { archivePlaylistItem, removePlaylistItem } from '../../redux/playlist'

type PlaylistItemProps = {
  item: PlaylistItemType,
  setTrackAsActive: (item: PlaylistItemType) => {},
  archiveTrack: (item: PlaylistItemType) => {},
  deleteTrack: (item: PlaylistItemType) => {},
  play: () => {}
}

export class PlaylistItemPresenter extends React.Component {

  props: PlaylistItemProps

  _iconButtonElement() {
    return(
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )
  }

  _rightIconMenu () {
    return (
      <IconMenu iconButtonElement={this._iconButtonElement()} >
        <MenuItem
          onClick={this.props.archiveTrack}
          leftIcon={<Done />}>
          Mark as played
        </MenuItem>
        <MenuItem
          onClick={this.props.deleteTrack}
          leftIcon={<Delete />}>
          Delete
        </MenuItem>
      </IconMenu>
    )
  }

  render() {
    return (
      <ListItem
        onClick={() => this.props.setTrackAsActive(this.props.item)}
        onDoubleClick={this.props.play}
        leftAvatar={<Avatar color={red50} backgroundColor={red700}>TC</Avatar>}
        rightIconButton={this._rightIconMenu()}
        primaryText={this.props.item.attributes.audio_title}
        secondaryText={ <p>{this.props.item.attributes.audio_description}</p> }
        secondaryTextLines={1}
      />
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTrackAsActive: () => {
      dispatch(changeTrack(ownProps.item))
    },
    archiveTrack: () => {
      dispatch(archivePlaylistItem(ownProps.item))
    },
    deleteTrack: () => {
      dispatch(removePlaylistItem(ownProps.item.id))
    },
    play: () => {
      dispatch(playClick())
    }
  }
}

export default connect(null, mapDispatchToProps)(PlaylistItemPresenter)
