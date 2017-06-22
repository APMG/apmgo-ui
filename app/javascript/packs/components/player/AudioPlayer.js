// @flow
import * as React from 'react';
import { connect } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player';

import Slider from 'material-ui/Slider';

import AudioPlayerModel from '../../models/AudioPlayerModel';
import type { PlaylistItemType } from '../../redux/types';
import PlayPauseButton from './PlayPauseButton'
import MuteButton from './MuteButton'
import TimeSlider from './TimeSlider'
import VolumeSlider from './VolumeSlider'

type AudioPlayerProps = {
  player: AudioPlayerModel,
  item: PlaylistItemType
}

class AudioPlayer extends React.Component {

  audioEl: HTMLAudioElement
  _rap: ReactAudioPlayer
  props: AudioPlayerProps
  state: {

  }

  render() {
    return (
      <div>
        {/* when the player (_rap) is rendered, the audioEl attribute */ }
        {/* is mapped onto the actual HTMLAudioElement */}
        { this._rap.render() }
        <h2>My Custom Playlist</h2>

        <PlayPauseButton audio={ this.audioEl } />
        <MuteButton audio={ this.audioEl } />

        <h3>Time Control</h3>
        <TimeSlider audio={ this.audioEl }/>

        <h3>Volume Control</h3>
        <VolumeSlider audio={ this.audioEl } />
      </div>
    )
  }

  componentWillMount() {
    this.refreshAudioPlayer(this.props.item)
  }

  componentWillReceiveProps(newProps) {
    debugger
    if(newProps.item.id !== this.props.item.id) {
      this.refreshAudioPlayer(newProps.item)
    }
  }

  componentDidMount() {
    this.audioEl = this._rap.audioEl
  }
  componentDidUpdate() {

    this.audioEl = this._rap.audioEl
  }

  refreshAudioPlayer(item?: PlaylistItemType) {
    if (!item) {
      return
    }
    this._rap = (new ReactAudioPlayer({
      src: item.attributes['audio-url'],
      muted: this.audioEl ? this.audioEl.muted : false,
      volume: this.audioEl ? this.audioEl.volume : null,
      currentTime: item.attributes['playtime'] || 0,
      controls: false
    }))
  }

}

const mapStateToProps = (state) : AudioPlayerProps => {
  let player = state.audioPlayer,
      item = state.data.data.find(item => {
        return item.id === player.currentTrackId
      });
debugger
  return {
    item: item,
    player: player
  }
}

export default connect(mapStateToProps, null)(AudioPlayer)
