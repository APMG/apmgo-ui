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
          &bull;&bull;&bull;
        </p>
      )
    }
  }

  render () {
    const { setTrackAsActive, play, item } = this.props

    const rendered = (
      <div styleName="tile">
        <div
          styleName="img"
          style={{backgroundImage: 'url(//via.placeholder.com/300x200/123456/ffffff?text=Any+size+img)'}}
          onClick={() => setTrackAsActive(item)}
          onDoubleClick={play}
        />
        <div
          onClick={() => setTrackAsActive(item)}
          onDoubleClick={play}
          styleName="content"
        >
          <div styleName="published">Published ■■■■■■ ■■, ■■■■</div>
          <div styleName="title">
            <h2 className="hdg hdg-2">{item.attributes.audio_title}</h2>
          </div>
          <div styleName="origin">
            <img styleName="origin_icon" src="//via.placeholder.com/32x32/123456/ffffff" />
            {item.attributes.source.replace(/^\/\//, '')}
            <a href={item.attributes.origin_url} styleName="origin_link" target="_blank">Source &raquo;</a>
          </div>
        </div>
        <div
          onClick={this._showMenu.bind(this)}
          onMouseLeave={this._hideMenu.bind(this)}
          styleName='menuButton'
        >
          {this._rightIconMenu()}
        </div>
      </div>
    )
    return rendered
  }
}
