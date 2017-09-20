// @flow
import * as React from 'react'
import PlayIcon from '../svg/PlayIcon'
import PauseIcon from '../svg/PauseIcon'

import './AudioPlayer.scss'

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
        disabled
        styleName="playPauseBtn"
      >
        Loading ...
      </button>
    )
  } else if (props.paused || typeof props.paused === 'undefined') {
    return (
      <button
        id="play-button"
        onClick={props.play}
        styleName="playPauseBtn"
      >
        <span className="invisible">Play</span>
        <PlayIcon />
      </button>
    )
  } else {
    return (
      <button
        id="pause-button"
        onClick={props.pause}
        styleName="playPauseBtn"
      >
        <span className="invisible">Pause</span>
        <PauseIcon />
      </button>
    )
  }
}
