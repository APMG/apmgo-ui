// @flow
import * as React from 'react';
import { connect } from 'react-redux';
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
    if (this.props.paused || typeof this.props.paused === 'undefined') {
      return (
        <button
          onClick={this.props.play}
          disabled={!this.props.canPlay}>
          Play
        </button>
      )
    } else {
      return (
        <button onClick={this.props.pause}>Pause</button>
      )
    }
  }
}

const mapStateToProps = (newState) => {
  return {
    paused: newState.audioPlayer.paused,
    item_id: newState.audioPlayer.currentTrackId,
    canPlay: newState.audioPlayer.canPlay
  }
}

const mapDispatchToProps = (dispatch, ownProps: PlayPauseProps) => {
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
