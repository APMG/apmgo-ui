// @flow
import React from 'react';
import { connect, dispatch } from 'react-redux'

import AudioPlayerState from '../../models/AudioPlayerState';
import type { PlaylistItemType } from '../../redux/types';
import PlayPauseButton from './PlayPauseButton'
import MuteButton from './MuteButton'
import TimeScrubber from './TimeScrubber'
import TimeKeeper from './TimeKeeper'
import VolumeSlider from './VolumeSlider'
import PlayTimeDisplay from './PlayTimeDisplay'
import { audioMetaDataLoaded, audioCanPlay } from '../../redux/audio-player'

type AudioPlayerProps = {
  item: PlaylistItemType,
  playerState: AudioPlayerState,
  audioCanPlay: () => {},
  audioMetaDataLoaded: () => {}
}

export class AudioPlayerPresenter extends React.Component {

  audio: HTMLAudioElement
  props: AudioPlayerProps

  constructor(props: AudioPlayerProps) {
    super(props)
  }

  componentDidMount() {
    // by now, audio is an HTMLAudioElement ref
    this.audio.src = this.props.item.attributes.audio_url
  }

  componentWillReceiveProps(newProps: AudioPlayerProps) {
    this._setPlayPaused(newProps.playerState.paused)
    this.audio.muted = newProps.playerState.muted
    this.audio.volume = newProps.playerState.volume

    if(newProps.item.id !== this.props.item.id) {
      this.audio.src = newProps.item.attributes.audio_url
    }

    if(newProps.playerState.updateAudioElementTime) {
      this.audio.currentTime = newProps.playerState.currentTime
    }
  }

  _setPlayPaused(paused: boolean) {
    if (paused !== this.audio.paused) {
      if (paused) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    }
  }

  metaDataLoaded(a:any,b:any,c:any) {
    this.audio.currentTime = this.props.item.attributes.playtime
    this.props.audioMetaDataLoaded(this.audio.duration)
  }

  render() {
    return (
      <div>
        <h2>My Custom Playlist</h2>
        <h3>
            {this.props.item
              ? 'Now playing: ' + this.props.item.attributes.audio_title
              : 'Loading ...'}
        </h3>

        <audio
          ref={(ref) => this.audio = ref }
          onCanPlay={this.props.audioCanPlay}
          onLoadedMetadata={this.metaDataLoaded.bind(this)}>
        </audio>

        <PlayPauseButton />
        <MuteButton />

        <h3>Time Control</h3>
        <TimeKeeper // this component is invisible
          audio={ this.audio }
          item_id={this.props.item.id}
        />
        <PlayTimeDisplay currentTime={this.props.playerState.currentTime} />
        <TimeScrubber
          item_id={ this.props.item.id }
          currentTime={ this.props.playerState.currentTime }
          paused={ this.props.playerState.paused }
        />

        <h3>Volume Control</h3>
        <VolumeSlider />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    audioCanPlay: () => {
      dispatch(audioCanPlay())
    },
    audioMetaDataLoaded: (duration) => {
      dispatch(audioMetaDataLoaded(duration))
    }
  }
}

const mapStateToProps = (newState) => {
  return {
    playerState: Object.assign({}, newState.audioPlayer)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerPresenter)
