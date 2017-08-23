// @flow
import * as React from 'react'
import { connect, dispatch } from 'react-redux'

import type { PlaylistItemType } from '../../redux/types'
import { changeTrack, playClick } from '../../redux/audio-player'
import { archivePlaylistItem, removePlaylistItem } from '../../redux/playlist'

type PlaylistItemProps = {
  item: PlaylistItemType,
  setTrackAsActive: (item: PlaylistItemType) => {},
  archiveTrack: (item: PlaylistItemType) => {},
  deleteTrack: (item: PlaylistItemType) => {},
  play: () => {}
}

export class PlaylistItemPresenter extends React.Component {

  props: PlaylistItemProps
  state: {
    showingMenu: boolean
  }

  constructor(props: PlaylistItemProps) {
    super(props)
    this.state = {showingMenu: false}
  }

  _showMenu() {
    this.setState({showingMenu: true})
  }

  _hideMenu() {
    this.setState({showingMenu: false})
  }

  _rightIconMenu () {
    if(this.state.showingMenu) {
      return (
        <ul className="menu">
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
        <p className="hamburger" onClick={this._showMenu.bind(this)}>hamburger</p>
      )
    }
  }

  render() {
    return (
      <li style={{display: 'block', backgroundColor: 'lightgray', marginBottom: '5px', padding: '10px'}}>
        <div
          onClick={() => this.props.setTrackAsActive(this.props.item)}
          onDoubleClick={this.props.play}
          style={{display: 'inline-block', width: '66%'}}
        >
          <h3>{this.props.item.attributes.audio_title}</h3>
          <p>{this.props.item.attributes.audio_description}</p>
        </div>
        <div
          onClick={this._showMenu.bind(this)}
          onMouseLeave={this._hideMenu.bind(this)}
          className="right-menu"
          style={{display: 'inline-block', width: '33%', verticalAlign: 'top'}}>
            {this._rightIconMenu()}
        </div>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
      dispatch(playClick())
    }
  }
}

export default connect(null, mapDispatchToProps)(PlaylistItemPresenter)
