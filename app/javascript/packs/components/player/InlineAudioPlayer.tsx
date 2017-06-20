import * as React from 'react';
import { connect } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player';

import AudioPlayerModel from '../../models/AudioPlayerModel';
import { PlaylistItemType } from '../../redux/types';
import PlayPauseButton from './PlayPauseButton';


class InlineAudioPlayer extends React.Component<{},{}> {

  audio: HTMLAudioElement
  private _rap: ReactAudioPlayer
  private _timer: number
  props:  {
    item: PlaylistItemType
    player?: AudioPlayerModel
  }
  state: {
    currentTime: number
  }

  constructor(props) {
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
        { this.state && Math.floor(this.state.currentTime) }
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

  private _setPlayPaused(newPaused: boolean) {
    if (!this.audio || (newPaused !== this.audio.paused)) {
      if (newPaused) {
        this._pause()
      } else {
        this._play()
      }
    }
  }

  private _pause() {
    this.audio.pause()
    this._stopTimer()
  }

  private _play() {
    this.audio.play()
    this._startTimer()
  }

  private _startTimer() {
    this._timer = setTimeout(() => {
      this._updateTimeInState()
    }, 1000)
  }

  private _stopTimer() {
    clearTimeout(this._timer)
  }

  private _updateTimeInState() {
    this.setState({
      currentTime: Math.floor(this.audio.currentTime)
    })
    console.log(this.audio.currentTime)
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