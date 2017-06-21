// @flow
import * as React from 'react';
import { connect } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player';

import Slider from 'material-ui/Slider';

import AudioPlayerModel from '../../models/AudioPlayerModel';
import type { PlaylistItemType } from '../../redux/types';
import PlayPauseButton from './PlayPauseButton'
import MuteButton from './MuteButton'

type AudioPlayerProps = {
  item: PlaylistItemType
}

class AudioPlayer extends React.Component {

  audio: HTMLAudioElement
  _rap: ReactAudioPlayer
  _timer: number = 12345
  // player: AudioPlayerModel
  props: AudioPlayerProps
  state: {
    currentTime: number,
    volume?: number,
    timeDraggingPoint?: number
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
        {/* when the player (_rap) is rendered, the audioEl attribute */ }
        {/* is mapped onto the actual HTMLAudioElement */}
        {/* { this._rap } */}
        <h2>My Custom Playlist</h2>

        <PlayPauseButton audio={ this.audio } />
        <MuteButton audio={ this.audio } />
        <br/>
        <h3>Volume Control</h3>
        <Slider
          value={ this.state.volume }
          onChange={ this._volumeChange.bind(this)}
        />

        <h3>Time Control</h3>
        { this.state && this.playTime() }

        <Slider
          value={ this.timeSliderValue() }
          onChange={ this._timeChange.bind(this)}
          onDragStop={this._timeChangeDragStop.bind(this) }
        />

      </div>
    )
  }

  componentWillMount() {
    debugger
    if (!this.item) {
      return
    }
    this.refreshAudioPlayer()
  }

  componentWillUpdate(nextProps) {
    if (!this.item) {
      return
    }
    if (nextProps.item.id ) {
      this.refreshAudioPlayer()
    }
  }

  componentDidMount() {
    if (!this.item) {
      return
    }
      this._updateTimeInState()
      this._updateVolumeInState()
  }

  componentWillReceiveProps(nextProps: AudioPlayerProps) {

  }

  refreshAudioPlayer() {
    if (!this.props.item) {
      return
    }
    this._rap = (new ReactAudioPlayer({
      src: this.props.item.attributes['audio-url'],
      muted: this.audio ? this.audio.muted : false,
      volume: this.audio ? this.audio.volume : null,
      controls: false
    })).render()

    this.audio = this._rap.audioEl
  }

  playTime() {
    if (!this.state.currentTime) {
      return "0:00"
    }

    let baseTime = this.state.currentTime;

    if (this.state.timeDraggingPoint) {
      baseTime = Math.floor(this.audio.duration * this.state.timeDraggingPoint)
    }

    let minutes = Math.floor(baseTime / 60),
        seconds = baseTime - (minutes * 60)

    return minutes + ":" + seconds.toString().padStart(2, '0')
  }

  timeSliderValue() {
    if(!this.audio) {
      return 0
    }
    let val = this.state.currentTime / this.audio.duration

    return val <= 1 ? val : 1
  }

  //  Managing
  //  Internal
  //  Component
  //  State
  ///////
  /////
  ///
  //


  // PLAYING AND PAUSING
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

  _updateVolumeInState() {
    this.setState({
      volume: this.audio.volume
    })
  }

  // TODO: do we want all the players to share a single volume slider?
  // if so hook this up to redux ...
  _volumeChange(event, newValue: number) {
    if (!this.audio) {
      return
    }

    this.audio.volume = newValue
    this._updateVolumeInState()
  }

  _timeChange(event, newValue: number) {
    this.setState({
      timeDraggingPoint: newValue
    })
  }

  _timeChangeDragStop(event) {
    if (!this.audio || !this.state.timeDraggingPoint) {
      return
    }
    // newValue is between 0 and 1
    this.audio.currentTime = this.audio.duration * this.state.timeDraggingPoint
    this._updateTimeInState()
    delete this.state.timeDraggingPoint
  }
}

const mapStateToProps = (state) : AudioPlayerProps => {
debugger
  return {
    item: state.data.data.find(item => item.id === state.audioPlayer.currentTrack)
  }
}

const mapDispatchToProps = (dispatch, ownProps: AudioPlayerProps) => {

}

export default connect(mapStateToProps, null)(AudioPlayer)
