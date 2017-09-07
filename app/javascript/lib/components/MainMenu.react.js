// @flow
import React from 'react'
import ApmLogo from './svg/ApmLogo.js'

import './MainMenu.scss'

type MainMenuProps = {
  name: string,
  logoutPath: string
}

let mainMenuDefaultProps = {
  name: 'Listener',
  logoutPath: ''
}

class MainMenu extends React.Component {
  state: {
    menuIsOpen: boolean
  }

  constructor (props: MainMenuProps = mainMenuDefaultProps) {
    super(props)
    this.state = {
      menuIsOpen: false
    }
  }

  _toggleMenu () {
    if (this.state.menuIsOpen === true) {
      this._closeMenu()
    } else {
      this._openMenu()
    }
  }

  _openMenu () {
    this.setState({menuIsOpen: true})
  }

  _closeMenu () {
    this.setState({menuIsOpen: false})
  }

  _menuOpenClass () {
    return this.state.menuIsOpen ? 'menu-visible' : ''
  }

  _rightMenu () {
    return (
      <div styleName="account">
        <button
          type="button"
          styleName="link"
          onClick={this._toggleMenu.bind(this)}
        >
          {this.props.name} &#9662;
        </button>
        <ul styleName={`menu ${this._menuOpenClass()}`}>
          <li>
            <a href={this.props.logoutPath} styleName="link">My Account</a>
          </li>
          <li>
            <a href={this.props.logoutPath} styleName="link">Log Out</a>
          </li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <header styleName="header" role="banner">
        <div styleName="logo">
          <ApmLogo />
          <span className="invisible">American Public Media</span>
        </div>
        <nav styleName="nav" role="navigation">
          <ul styleName="list">
            <li><a styleName="link active" href="#">Playlist</a></li>
            <li><a styleName="link" href="#">Archive</a></li>
          </ul>
          {this._rightMenu()}
        </nav>
      </header>
    )
  }
}

export default MainMenu
