// @flow
import * as React from 'react'

type PlayPauseProps = {
  paused: boolean,
  canPlay: boolean,
  play: () => {},
  pause: () => {}
}

export default function PlayPauseButtonPresenter (props: PlayPauseProps) {
  if (!props.canPlay) {
    return (
      <button
        id="play-pause-loading-button"
        disabled>
        Loading ...
      </button>
    )
  } else if (props.paused || typeof props.paused === 'undefined') {
    return (
      <button
        id="play-button"
        onClick={props.play}>
        Play
      </button>
    )
  } else {
    return (
      <button
        id="pause-button"
        onClick={props.pause}>
        Pause
      </button>
    )
  }
}
