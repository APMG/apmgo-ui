// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { pauseAudioPlayer, playAudioPlayer } from '../../redux/audio-player';

type PlayPauseProps = {
  audio: HTMLAudioElement,
  paused: boolean,
  item_id: number,
  play: () => {},
  pause: () => {}
}

class PlayPauseButton extends React.Component {

  props: PlayPauseProps

  render() {
    if (this.props.paused || typeof this.props.paused === 'undefined') {
      return (
        <button onClick={this.props.play}>Play</button>
      )
    } else {
      return (
        <button onClick={this.props.pause}>Pause</button>
      )
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.paused === newProps.paused) {
      return
    }

    if(newProps.paused) {
      newProps.audio.pause()
    } else {
      newProps.audio.play()
    }
  }
}

const mapStateToProps = (newState) => {
  return {
    paused: newState.audioPlayer.paused,
    item_id: newState.audioPlayer.currentTrackId
  }
}

const mapDispatchToProps = (dispatch, ownProps: PlayPauseProps) => {
  return {
    play: () : void => {
      dispatch(playAudioPlayer(ownProps.item_id))
    },
    pause: (): void => {
      dispatch(pauseAudioPlayer(ownProps.item_id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseButton)
