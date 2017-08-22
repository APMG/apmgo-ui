// @flow
import React from 'react'

type LoggedProps = {
  logoutPath: string
}

const Logged = (props: LoggedProps) => (
  <IconMenu
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
  logoutPath: string
}

let mainMenuDefaultProps = {
  name: 'Listener',
  logoutPath: ''
}

class MainMenu extends React.Component {
  styles = {
    width: '100%',
    fontFamily: 'Roboto, sans-serif'
  }

  state: {
    menuIsOpen: boolean
  }


  constructor (props: MainMenuProps = mainMenuDefaultProps) {
    super(props)
    this.state = {
      menuIsOpen: false
    }
  }

  _openMenu() {
    this.setState({menuIsOpen: true})
  }

  _closeMenu() {
    this.setState({menuIsOpen: false})
  }

  _rightMenu() {
    let spanStyle = {display: 'block'}
    if(this.state.menuIsOpen) {
      return (
        <div onMouseLeave={this._closeMenu.bind(this)} >
          <ul>
            <li>RSS Feed</li>
            <li>Archive</li>
            <li><a href={this.props.logoutPath}>Log Out</a></li>
          </ul>
        </div>
      )
    } else {
      return (<span onClick={this._openMenu.bind(this)} style={spanStyle}> hamburger </span>)
    }
  }

  render() {
    return (
    <div style={this.styles}>
      <div style={{width: '80%', display: 'inline-block'}}>
        <h2>{`${this.props.name}'s Playlist`}</h2>
      </div>
      <div style={{width: '20%', display: 'inline-block'}}>
        {this._rightMenu()}
      </div>
    </div>
    )
  }
}

export default MainMenu
