// @flow
import React, { Component } from 'react'
import { type PlaylistItemProps } from './PlaylistItem'
import { type PlaylistItemType } from '../../../redux/types'
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
    const { setTrackAsActive, play, item } = this.props

    const rendered = (
      <div styleName="tile">
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
            <img
              styleName="origin_icon"
              src="//via.placeholder.com/32x32/123456/ffffff"
              alt={item.attributes.audio_title}
            />
            {item.attributes.source.replace(/^\/\//, '')}
            <a
              href={item.attributes.origin_url}
              styleName="origin_link"
              target="_blank"
              rel="noopener">
              Source &raquo;
            </a>
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
