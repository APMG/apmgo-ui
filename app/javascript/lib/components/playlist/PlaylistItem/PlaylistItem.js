// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { PlaylistItemType } from '../../../redux/types'
import { changeTrack, playClick } from '../../../redux/audio-player'
import { archivePlaylistItem, removePlaylistItem } from '../../../redux/playlist'
import { configureDD } from './DNDPlaylistItem'

import './PlaylistItem.scss'

export type PlaylistItemProps = {
  item: PlaylistItemType,
  index: number,
  setTrackAsActive: (item: PlaylistItemType) => {},
  archiveTrack: (item: PlaylistItemType) => {},
  deleteTrack: (item: PlaylistItemType) => {},
  play: () => {},
  playlistItemMoved: (item: PlaylistItemType, newIndex: number) => {},
  connectDragSource(component: React.Element<*>): React.Element<*>,
  connectDragPreview(component: React.Element<*>): React.Element<*>,
  isDragging: boolean
}

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

export class PlaylistItemPresenter extends Component {
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
    const { setTrackAsActive, play, item, connectDragSource } = this.props

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
    return connectDragSource(rendered)
  }
}

const mapDispatchToProps = (dispatch: (action: any) => {}, ownProps) => {
  return {
    setTrackAsActive: () => {
      dispatch(changeTrack(ownProps.item))
    },
    archiveTrack: () => {
      dispatch(archivePlaylistItem(ownProps.item))
    },
    deleteTrack: () => {
      dispatch(removePlaylistItem(ownProps.item.id))
    },
    play: () => {
      dispatch(playClick(ownProps.item.id))
    }
  }
}

const DDPlaylistItem = configureDD(PlaylistItemPresenter)
const ReduxPlaylistItem = connect(null, mapDispatchToProps)(DDPlaylistItem)

export default ReduxPlaylistItem
