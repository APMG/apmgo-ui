// @flow
import React from 'react'
import PropTypes from 'prop-types'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={ <IconButton><ExpandMoreIcon /></IconButton> }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="RSS Feed" />
    <MenuItem primaryText="Archive" />
    <MenuItem primaryText="Log out" onClick={(e) => (
      window.location.href=props.logoutPath
    )} />
  </IconMenu>
);

Logged.muiName = 'IconMenu'

type MainMenuProps = {
  name: string,
  logoutPath?: string
}

let mainMenuDefaultProps = {
  name: 'Listener'
}

const MainMenu = (props: MainMenuProps = mainMenuDefaultProps) => (
  <AppBar
    title={`${props.name}'s Playlist`}
    iconElementLeft={<div></div>}
    iconElementRight={<Logged logoutPath={props.logoutPath} />}
  />
)

export default MainMenu
