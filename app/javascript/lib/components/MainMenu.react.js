// @flow
import React from 'react'

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

  _openMenu () {
    this.setState({menuIsOpen: true})
  }

  _closeMenu () {
    this.setState({menuIsOpen: false})
  }

  _rightMenu () {
    if (this.state.menuIsOpen) {
      return (
        <nav role='navigation' onMouseLeave={this._closeMenu.bind(this)} >
          <ul>
            <li>RSS Feed</li>
            <li>Archive</li>
            <li><a href={this.props.logoutPath}>Log Out</a></li>
          </ul>
        </nav>
      )
    } else {
      return (<span onClick={this._openMenu.bind(this)}> hamburger </span>)
    }
  }

  render () {
    return (
      <header role='banner'>
        <div>
          <h2>{`${this.props.name}'s Playlist`}</h2>
        </div>
        <div>
          {this._rightMenu()}
        </div>
      </header>
    )
  }
}

export default MainMenu
