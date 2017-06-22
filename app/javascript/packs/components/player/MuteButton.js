// @flow
import * as React from 'react'
import { dispatch, connect } from 'react-redux'
import { muteAudioPlayer, unmuteAudioPlayer } from '../../redux/audio-player'

type MuteButtonProps = {
  audio: HTMLAudioElement,
  muted: boolean,
  mute: () => {},
  unmute: () => {}
}

class MuteButton extends React.Component {

  props: MuteButtonProps

  componentWillReceiveProps(newProps) {
    if (this.props.muted === newProps.muted) {
      return
    }

    this.props.audio.muted = newProps.muted
  }

  render() {
    if (this.props.muted) {
      return (
        <button onClick={this.props.unmute}>Unmute</button>
      )
    } else {
      return (
        <button onClick={this.props.mute}>Mute</button>
      )
    }
  }
}

const mapStateToProps = (newState) => {
  return {
    muted: newState.audioPlayer.muted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mute: () => {
      dispatch(muteAudioPlayer())
    },
    unmute: () => {
      dispatch(unmuteAudioPlayer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuteButton)
