// @flow
import React, { Component } from 'react'
import { type PlaylistItemProps } from './PlaylistItem'
import { type PlaylistItemType } from '../../../redux/types'
import SourceIcon from './SourceIcon'
import TrashIcon from '../../svg/TrashIcon'
import FolderIcon from '../../svg/FolderIcon'

import './PlaylistItem.scss'

export default class PlaylistItemPresenter extends Component {
  props: PlaylistItemProps
  state: {
    showingMenu: boolean
  }

  constructor (props: PlaylistItemProps) {
    super(props)
    this.state = {showingMenu: false}
  }

  _toggleMenu () {
    if (this.state.showingMenu === true) {
      this._hideMenu()
    } else {
      this._showMenu()
    }
  }

  _showMenu () {
    this.setState({showingMenu: true})
  }

  _hideMenu () {
    this.setState({showingMenu: false})
  }

  _menuOpenClass () {
    return this.state.showingMenu ? 'menu-visible' : ''
  }

  _contextMenu () {
    return (
      <div styleName="menuContainer">
        <button
          onClick={this._toggleMenu.bind(this)}
          styleName={`menuButton ${this._menuOpenClass()}`}
        >
          &bull;&bull;&bull;
        </button>
        <div styleName={`menuLayer ${this._menuOpenClass()}`}>
          <ul styleName='menu'>
            <li>
              <button styleName="action" onClick={this.props.archiveTrack}>
                <div styleName="action_icon">
                  <FolderIcon />
                </div>
                Archive
              </button>
            </li>
            <li>
              <button styleName="action" onClick={this.props.deleteTrack}>
                <div styleName="action_icon">
                  <TrashIcon />
                </div>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  _displayImage (item: PlaylistItemType) {
    if (item.attributes.audio_image_url) {
      return item.attributes.audio_image_url
    } else {
      return '//via.placeholder.com/300x200/123456/ffffff?text=Placeholder'
    }
  }

  _publishDate (item: PlaylistItemType) {
    if (item.attributes.audio_publish_datetime) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date(item.attributes.audio_publish_datetime)
      let month = months[date.getMonth()]
      let day = date.getDate()
      let year = date.getFullYear()
      let dateString = `${month} ${day}, ${year}`

      return (
        <div styleName="published">Published {dateString}</div>
      )
    }
  }

  render () {
    const { setTrackAsActive, play, item, style } = this.props

    const rendered = (
      <div styleName="tile" style={style}>
        <div
          styleName="img"
          style={{backgroundImage: `url(${this._displayImage(item)})`}}
          onClick={() => setTrackAsActive(item)}
          onDoubleClick={play}
        />
        <div
          onClick={() => setTrackAsActive(item)}
          onDoubleClick={play}
          styleName="content"
        >
          {this._publishDate(item)}
          <div styleName="title">
            <h2 className="hdg hdg-2">{item.attributes.audio_title}</h2>
          </div>
          <div styleName="origin">
            <SourceIcon
              source={item.attributes.source}
            />
            {item.attributes.source.replace(/^\/\//, '')}
            <a
              href={item.attributes.origin_url}
              styleName="origin_link"
              target="_blank"
              rel="noopener">
              Source  &raquo;
            </a>
          </div>
        </div>
        {this._contextMenu()}
      </div>
    )
    return rendered
  }
}
