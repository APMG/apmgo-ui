// @flow
import * as React from 'react';
import { connect, dispatch } from 'react-redux';
import { pauseClick, playClick } from '../../redux/audio-player';

type PlayPauseProps = {
  audio: HTMLAudioElement,
  paused: boolean,
  item_id: number,
  canPlay: boolean,
  play: () => {},
  pause: () => {}
}

export class PlayPauseButtonPresenter extends React.Component {

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

export const mapStateToProps = (newState: any) => {
  return {
    paused: newState.audioPlayer.paused,
    item_id: newState.audioPlayer.currentTrackId,
    canPlay: newState.audioPlayer.canPlay
  }
}

export const mapDispatchToProps = (dispatch: dispatch, ownProps: PlayPauseProps) => {
  return {
    play: () : void => {
      dispatch(playClick(ownProps.item_id))
    },
    pause: (): void => {
      dispatch(pauseClick(ownProps.item_id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseButtonPresenter)
