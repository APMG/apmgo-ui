// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { PlaylistItemType } from '../../redux/types'
import { changeTrack, playClick } from '../../redux/audio-player'
import { archivePlaylistItem, removePlaylistItem, movePlaylistItem } from '../../redux/playlist'
import { configureDD } from '../../drag-drop/playlist-item'

import './PlaylistItem.scss'

export type PlaylistItemProps = {
  item: PlaylistItemType,
  index: number,
  setTrackAsActive: (item: PlaylistItemType) => {},
  archiveTrack: (item: PlaylistItemType) => {},
  deleteTrack: (item: PlaylistItemType) => {},
  play: () => {},
  movePlaylistItem: () => {},
  playlistItemMoved: (item: PlaylistItemType, newIndex: number) => {},
  connectDragSource(component: React.Element<*>): React.Element<*>,
  connectDropTarget(component: React.Element<*>): React.Element<*>,
  isDragging: boolean
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
    const { setTrackAsActive, play, item, connectDragSource, connectDropTarget, isDragging } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDropTarget(connectDragSource(
      <li style={{display: 'block', foo: isDragging, opacity: opacity, backgroundColor: 'lightgray', marginBottom: '5px', padding: '10px'}}>
        <div
          onClick={() => setTrackAsActive(item)}
          onDoubleClick={play}
          style={{display: 'inline-block', width: '66%'}}
          styleName='a'
        >
          <h3>{item.attributes.audio_title}</h3>
          <p>{item.attributes.audio_description}</p>
        </div>
        <div
          onClick={this._showMenu.bind(this)}
          onMouseLeave={this._hideMenu.bind(this)}
          className='right-menu'
          styleName='b'
          style={{display: 'inline-block', width: '33%', verticalAlign: 'top'}}>
          {this._rightIconMenu()}
        </div>
      </li>
    ))
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
    },
    movePlaylistItem: (from, to) => {
      dispatch(movePlaylistItem(from, to))
    }
  }
}

const DDPlaylistItem = configureDD(PlaylistItemPresenter)
const PlaylistItem = connect(null, mapDispatchToProps)(DDPlaylistItem)
export default PlaylistItem
