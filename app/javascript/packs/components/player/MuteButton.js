// @flow
import * as React from 'react'
import { dispatch, connect } from 'react-redux'
import { muteClick, unmuteClick } from '../../redux/audio-player'

type MuteButtonProps = {
  muted: boolean,
  mute: () => {},
  unmute: () => {}
}

export class MuteButtonPresenter extends React.Component {

  props: MuteButtonProps

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
      dispatch(muteClick())
    },
    unmute: () => {
      dispatch(unmuteClick())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuteButtonPresenter)
