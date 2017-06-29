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
  audioPlayer: AudioPlayerState,
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
    // it is set when the component renders
    this.audio.src = this.props.item.attributes.audio_url
  }

  componentWillReceiveProps(newProps: AudioPlayerProps) {
    this._setPlayPaused(newProps.audioPlayer.paused)
    this.audio.muted = newProps.audioPlayer.muted
    this.audio.volume = newProps.audioPlayer.volume

    if(newProps.item.id !== this.props.item.id) {
      this.audio.src = newProps.item.attributes.audio_url
    }

    if(newProps.audioPlayer.updateAudioElementTime) {
      this.audio.currentTime = newProps.audioPlayer.currentTime
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
            { this.props.item
              ? 'Now playing: ' + this.props.item.attributes.audio_title
              : 'Loading ...' }
        </h3>

        <audio
          ref={ (ref) => this.audio = ref }
          onCanPlay={ this.props.audioCanPlay }
          onLoadedMetadata={ this.metaDataLoaded.bind(this) }>
        </audio>

        <PlayPauseButton />
        <MuteButton />

        <h3>Time Control</h3>
        <TimeKeeper // this component is invisible
          audio={ this.audio }
          item_id={ this.props.item.id }
        />
        <PlayTimeDisplay />
        <TimeScrubber
          item_id={ this.props.item.id }
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
    audioPlayer: newState.audioPlayer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerPresenter)
