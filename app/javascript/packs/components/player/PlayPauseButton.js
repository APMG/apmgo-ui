// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { pauseAudioPlayer, playAudioPlayer } from '../../redux/audio-player';

class PlayPauseProps {
  audio: HTMLAudioElement
  play: () => {}
  pause: () => {}
}

class PlayPauseButton extends React.Component {

  props: PlayPauseProps

  render() {
    if (!this.audio || this.props.audio.paused ) {
      return (
        <button onClick={this.props.play}>Play</button>
      )
    } else {
      return (
        <button onClick={this.props.pause}>Pause</button>
      )
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps: PlayPauseProps) => {
  return {
    play: () : void => {
      dispatch(playAudioPlayer())
    },
    pause: (): void => {
      dispatch(pauseAudioPlayer())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PlayPauseButton)
