import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import { grey400, transparent } from 'material-ui/styles/colors'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'

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

const PlaylistItem = (props) => (
  <ListItem
    leftAvatar={ <Avatar backgroundColor={transparent} style={{left: 8}}>CMPR</Avatar>}
    rightIconButton={rightIconMenu}
    primaryText="Michael Barone interviews J.S. Bach"
    secondaryText={ <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> }
    secondaryTextLines={1}
  />
)

PlaylistItem.muiName = 'ListItem'

const Playlist = (props) => (
  <List>
    <PlaylistItem />
  </List>
)

Playlist.defaultProps = {
}

Playlist.propTypes = {
  // logoutPath: PropTypes.string
}

export default Playlist
