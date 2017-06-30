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
        <button id="unmute-button" onClick={this.props.unmute}>Unmute</button>
      )
    } else {
      return (
        <button id="mute-button" onClick={this.props.mute}>Mute</button>
      )
    }
  }
}

export default MuteButtonPresenter
