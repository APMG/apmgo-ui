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

import {
  audioMetaDataLoaded,
  audioCanPlay,
  playClick,
  pauseClick,
  muteClick,
  unmuteClick,
  updatePlayTime,
  timeScrubberChange,
  volumeChange,
  changeTrack
} from '../../redux/audio-player'

import { archivePlaylistItem } from '../../redux/playlist'

type AudioPlayerProps = {
  item: PlaylistItemType,
  audioPlayer: AudioPlayerState,
  audioCanPlay: () => {},
  audioMetaDataLoaded: (duration: number) => {},
  pause: () => {},
  play: () => {},
  mute: () => {},
  unmute: () => {},
  updatePlayTimeTimeKeeper: () => {},
  updatePlayTimeTimeScrubber: () => {},
  timeScrubberChange: () => {},
  updateVolume: () => {},
  onEnded: () => {},
  changeTrack: (item: PlaylistItemType) => {}
}

export class AudioPlayerPresenter extends React.Component {

  audio: HTMLAudioElement
  props: AudioPlayerProps

  constructor(props: AudioPlayerProps) {
    super(props)
  }

  componentDidMount() {
    // by now, this.audio is an HTMLAudioElement ref
    // it gets set when the component renders...
    // see the audio element's `ref` attribute

    this.audio.src = this.props.item.attributes.audio_url
    this.audio.oncanplay = this.props.audioCanPlay,
    this.audio.onloadedmetadata = this.metaDataLoaded.bind(this)
    this.audio.onended = this.props.onEnded

    // So, these are being set here to make the component testable
    // the audio element does not get rendered in tests
    // so that logic needed to be moved out of the render function
    // to here, where it can be overridden by a test class
  }

  componentWillReceiveProps(newProps: AudioPlayerProps) {

    this._setPlayPaused(newProps.audioPlayer.paused)
    this.audio.muted = newProps.audioPlayer.muted
    this.audio.volume = newProps.audioPlayer.volume

    if(newProps.item.id !== this.props.item.id) {
      this.audio.src = newProps.item.attributes.audio_url
      if(this.audio.canPlay && !this.props.audioPlayer.paused) {
        this.audio.play()
      }
    }

    if(newProps.item.id !== newProps.audioPlayer.currentTrackId) {
      this.props.changeTrack(newProps.item)
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

  audioRefCallback(ref:any) {
    if (!this.audio) {
      this.audio = ref
    }
  }

  render() {
    return (
      <div>
        <h3>
            { this.props.item
              ? 'Now playing: ' + this.props.item.attributes.audio_title
              : 'Loading ...' }
        </h3>

        <audio
          ref={ (ref) => this.audio=ref }>
        </audio>

        <PlayPauseButton
          paused={this.props.audioPlayer.paused}
          canPlay={this.props.audioPlayer.canPlay}
          pause={this.props.pause}
          play={this.props.play}
        />
        <MuteButton
          muted={this.props.audioPlayer.muted}
          mute={this.props.mute}
          unmute={this.props.unmute}
        />

        <h3>Time Control</h3>
        <TimeKeeper // this component is invisible
          audio={ this.audio }
          updatePlayTime={this.props.updatePlayTimeTimeKeeper}
        />
        <PlayTimeDisplay
          currentTime={this.props.audioPlayer.currentTime}
        />
        <TimeScrubber
          updatePlayTime={this.props.updatePlayTimeTimeScrubber}
          timeScrubberChange={this.props.timeScrubberChange}
          paused={this.props.audioPlayer.paused}
          duration={this.props.audioPlayer.duration}
          currentTime={this.props.audioPlayer.currentTime}
        />

        <h3>Volume Control</h3>
        <VolumeSlider
          volume={this.props.audioPlayer.volume}
          updateVolume={this.props.updateVolume}
        />
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch: dispatch, ownProps: AudioPlayerProps) => {
  return {
    audioCanPlay: () => {
      dispatch(audioCanPlay())
    },
    audioMetaDataLoaded: (duration: number) => {
      dispatch(audioMetaDataLoaded(duration))
    },
    play: () : void => {
      dispatch(playClick(ownProps.item.id))
    },
    pause: (): void => {
      dispatch(pauseClick(ownProps.item.id))
    },
    mute: () => {
      dispatch(muteClick())
    },
    unmute: () => {
      dispatch(unmuteClick())
    },
    updatePlayTimeTimeKeeper: (currentTime: number) => {
      dispatch(updatePlayTime(ownProps.item.id, Math.ceil(currentTime)))
    },
    updatePlayTimeTimeScrubber: (currentTime: number) => {
      dispatch(updatePlayTime(ownProps.item.id, Math.ceil(currentTime)))
    },
    timeScrubberChange: (currentTime: number) => {
      dispatch(timeScrubberChange(ownProps.item.id, Math.ceil(currentTime)))
    },
    updateVolume: (volume: number) => {
      dispatch(volumeChange(volume))
    },
    onEnded: () => {
      dispatch(archivePlaylistItem(ownProps.item))
    },
    changeTrack: ((item: PlaylistItemType) => {
      dispatch(changeTrack(item))
    })
  }
}

export const mapStateToProps = (newState: any) => {
  return {
    audioPlayer: newState.audioPlayer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerPresenter)
