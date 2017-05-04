import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
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

const PlaylistItem1 = (props) => (
  <ListItem
    leftAvatar={<Avatar color={lightGreen50} backgroundColor={lightGreen400}>CM</Avatar>}
    rightIconButton={rightIconMenu}
    primaryText="Michael Barone interviews J.S. Bach"
    secondaryText={ <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> }
    secondaryTextLines={1}
  />
)

const PlaylistItem2 = (props) => (
  <ListItem
    leftAvatar={<Avatar color={lightBlue50} backgroundColor={lightBlue400}>MN</Avatar>}
    rightIconButton={rightIconMenu}
    primaryText="Kerri Miller interviews Stephen King"
    secondaryText={ <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> }
    secondaryTextLines={1}
  />
)

const PlaylistItem3 = (props) => (
  <ListItem
    leftAvatar={<Avatar color={red50} backgroundColor={red700}>TC</Avatar>}
    rightIconButton={rightIconMenu}
    primaryText="Jay Gabler interviews Bob Dylan"
    secondaryText={ <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> }
    secondaryTextLines={1}
  />
)


const Playlist = (props) => (
  <List>
    <PlaylistItem1 />
    <PlaylistItem2 />
    <PlaylistItem3 />
  </List>
)

Playlist.defaultProps = {
}

Playlist.propTypes = {
  // logoutPath: PropTypes.string
}

export default Playlist
