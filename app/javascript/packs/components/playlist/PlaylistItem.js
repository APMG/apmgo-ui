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
import { changeTrack } from '../../redux/audio-player'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>

);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem leftIcon={<Done />}>Mark as played</MenuItem>
    <MenuItem leftIcon={<Delete />}>Delete</MenuItem>
  </IconMenu>
)

type PlaylistItemProps = {
  item: PlaylistItemType,
  playTrack: () => {}
}

export class PlaylistItemPresenter extends React.Component {

  props: PlaylistItemProps

  render() {
    return (
      <ListItem
        onClick={() => this.props.playTrack(this.props.item)}
        leftAvatar={<Avatar color={red50} backgroundColor={red700}>TC</Avatar>}
        rightIconButton={rightIconMenu}
        primaryText={this.props.item.attributes.audio_title}
        secondaryText={ <p>{this.props.item.attributes.audio_description}</p> }
        secondaryTextLines={1}
      />
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    playTrack: () => {
      dispatch(changeTrack(ownProps.item))
    }
  }
}

export default connect(null, mapDispatchToProps)(PlaylistItemPresenter)
