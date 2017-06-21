import * as React from 'react'
import { dispatch, connect } from 'react-redux'
import { muteAudioPlayer, unmuteAudioPlayer } from '../../redux/audio-player'

type MuteButtonProps = {
  muted: boolean
}

class MuteButton extends React.Component {

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

const mapDispatchToProps = (dispatch, ownProps: MuteButtonProps ) => {
  return {
    mute: () => {
      dispatch(muteAudioPlayer(ownProps.item_id))
    },
    unmute: () => {
      dispatch(unmuteAudioPlayer(ownProps.item_id))
    }
  }
}

export default connect(null, mapDispatchToProps)(MuteButton)
