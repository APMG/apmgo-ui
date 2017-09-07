// @flow
import * as React from 'react'

type MuteButtonProps = {
  muted: boolean,
  mute: () => {},
  unmute: () => {}
}

const MuteButtonPresenter = (props: MuteButtonProps) => {
  if (props.muted) {
    return (
      <button id="unmute-button" onClick={props.unmute}>Unmute</button>
    )
  } else {
    return (
      <button id="mute-button" onClick={props.mute}>Mute</button>
    )
  }
}

export default MuteButtonPresenter
