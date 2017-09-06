// @flow
import React, { Component } from 'react'
import { type PlaylistItemProps } from './PlaylistItem'

import './PlaylistItem.scss'

function removeLastWord (text: string) {
  let lastSpace = text.lastIndexOf(' ')
  return text.substr(0, lastSpace).trim()
}

function truncateText (text: string, maxLength: number = 200) {
  if (text.length < maxLength) {
    return text
  }
  text = removeLastWord(text.substr(0, maxLength)) + '...'

  return text.length <= maxLength
    ? text
    : removeLastWord(text) + '...'
}

export default class PlaylistItemPresenter extends Component {
  props: PlaylistItemProps
  state: {
    showingMenu: boolean
  }

  constructor (props: PlaylistItemProps) {
    super(props)
    this.state = {showingMenu: false}
  }

  _showMenu () {
    this.setState({showingMenu: true})
  }

  _hideMenu () {
    this.setState({showingMenu: false})
  }

  _rightIconMenu () {
    if (this.state.showingMenu) {
      return (
        <ul className='menu'>
          <li onClick={this.props.archiveTrack} >
            Mark as played
          </li>
          <li onClick={this.props.deleteTrack}>
            Delete
          </li>
        </ul>
      )
    } else {
      return (
        <p
          className='hamburger'
          onClick={this._showMenu.bind(this)}>
          hamburger
        </p>
      )
    }
  }

  render () {
    const { setTrackAsActive, play, item } = this.props

    const rendered = (
      <div style={{display: 'block', backgroundColor: 'lightgray', marginBottom: '5px', padding: '10px'}}>
        <div
          onClick={() => setTrackAsActive(item)}
          onDoubleClick={play}
          style={{display: 'inline-block', width: '66%'}}
          styleName='a'
        >
          <h3>{item.attributes.audio_title}</h3>
          <p>{truncateText(item.attributes.audio_description)}</p>
        </div>
        <div
          onClick={this._showMenu.bind(this)}
          onMouseLeave={this._hideMenu.bind(this)}
          className='right-menu'
          styleName='b'
          style={{display: 'inline-block', width: '33%', verticalAlign: 'top'}}>
          {this._rightIconMenu()}
        </div>
      </div>
    )
    return rendered
  }
}
