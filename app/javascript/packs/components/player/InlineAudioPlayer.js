// @flow
import * as React from 'react';
import { connect } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player';

import AudioPlayerModel from '../../models/AudioPlayerModel';
import { PlaylistItemType } from '../../redux/types';
import PlayPauseButton from './PlayPauseButton'
import { deletePlaylistItem } from '../../service/playlist'

class InlineAudioPlayer extends React.Component {

  audio: HTMLAudioElement
  _rap: ReactAudioPlayer
  _timer: number = 12345678
  props:  {
    item: PlaylistItemType,
    player: AudioPlayerModel
  }
  state: {
    currentTime: number
  }

  constructor(props: {item: PlaylistItemType}) {
    super(props)
    this.state = {
      currentTime: 0
    }
  }

  render() {
    return (
      <div>
        {
          // when the player is rendered, the audioEl attribute
          // is mapped onto the actual HTMLAudioElement
          this._rap.render()
        }
        { this.state && this.state.currentTime }
        <PlayPauseButton
          item_id={this.props.item.id}
          paused={this.audio ? this.audio.paused : true }
        />
      </div>
    )
  }

  componentWillMount() {
    this._rap = new ReactAudioPlayer({
      src: this.props.item.attributes['audio-url'],
      controls: false
    })
  }

  componentDidMount() {
      this.audio = this._rap.audioEl
      this._updateTimeInState()
  }

  componentWillReceiveProps(nextProps) {
    this._setPlayPaused(nextProps.player.paused);
  }


  //  Managing
  //  Internal
  //  Component
  //  State
  ///////
  /////
  ///
  //

  _setPlayPaused(newPaused: boolean) {
    if (!this.audio || (newPaused !== this.audio.paused)) {
      if (newPaused) {
        this._pause()
      } else {
        this._play()
      }
    }
  }

  _pause() {
    this.audio.pause()
    this._stopTimer()
  }

  _play() {
    this.audio.play()
    this._startTimer()
  }

  _startTimer() {
    this._timer = setInterval(() => {
      this._updateTimeInState()
    }, 1000)
  }

  _stopTimer() {
    clearInterval(this._timer)
  }

  _updateTimeInState() {
    this.setState({
      currentTime: Math.ceil(this.audio.currentTime)
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  let player = state.audioPlayers.find(player => player.item_id === ownProps.item.id)
  return {
    player: player
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

}

export default connect(mapStateToProps, null)(InlineAudioPlayer)
