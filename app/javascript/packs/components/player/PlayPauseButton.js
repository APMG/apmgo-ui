// @flow
import * as React from 'react';
import { connect, dispatch } from 'react-redux';
import { pauseClick, playClick } from '../../redux/audio-player';

type PlayPauseProps = {
  paused: boolean,
  canPlay: boolean,
  play: () => {},
  pause: () => {}
}

export default class PlayPauseButtonPresenter extends React.Component {

  props: PlayPauseProps

  render() {

    if(!this.props.canPlay) {
      return (
        <button
          id="play-pause-loading-button"
          disabled={true}>
          Loading ...
        </button>
      )
    } else if (this.props.paused || typeof this.props.paused === 'undefined') {
      return (
        <button
          id="play-button"
          onClick={this.props.play}>
          Play
        </button>
      )
    } else {
      return (
        <button
          id="pause-button"
          onClick={this.props.pause}>
          Pause
        </button>
      )
    }
  }
}
