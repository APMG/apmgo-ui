import * as React from 'react'
import * as ReactDOM from 'react-dom'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'


import { PlaylistItemType } from '../../redux/types'
import InlineAudioPlayer from '../../components/player/InlineAudioPlayer'

import {
  grey400,
  lightGreen50,
  lightGreen400,
  lightBlue50,
  lightBlue400,
  red50,
  red700
} from 'material-ui/styles/colors'

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

const PlaylistItem = (props: { item: PlaylistItemType }) => (
  // <ListItem
  //   leftAvatar={<Avatar color={red50} backgroundColor={red700}>TC</Avatar>}
  //   rightIconButton={rightIconMenu}
  //   primaryText={props.item.attributes['audio-title']}
  //   secondaryText={ <p>{props.item.attributes['audio-description']}</p> }
  //   secondaryTextLines={1}
  // />
  <div>
    <h1>Whoa!</h1>
    <InlineAudioPlayer item={props.item} />
  </div>
)

export default PlaylistItem
