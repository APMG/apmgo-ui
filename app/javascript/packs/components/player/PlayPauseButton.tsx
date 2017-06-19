import * as React from 'react';
import { connect } from 'react-redux';
import { pauseAudioPlayer, playAudioPlayer } from '../../redux/audio-player';
import { AudioPlayerType } from '../../redux/types';
import AudioPlayer from '../../models/AudioPlayer'
import { DefaultState } from '../../redux/defaults'

interface PlayPauseProps {
  item_id: number
  player?: AudioPlayerType
  play?: () => void
  pause?: () => void
}

class PlayPauseButton extends React.Component<PlayPauseProps, {}> {

  props: PlayPauseProps

  render() {
    if (this.props.player.paused) {
      return (
        <button onClick={this.props.play}>Play</button>
      )
    } else {
      return (
        <button onClick={this.props.pause}>Pause</button>
      )
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps: PlayPauseProps) => {
  return {
    play: () : void => {
      dispatch(playAudioPlayer(ownProps.item_id))
    },
    pause: (): void => {
      dispatch(pauseAudioPlayer(ownProps.item_id))
    }
  }
}

const mapStateToProps = (state : any, ownProps: PlayPauseProps) => {
  let player = state.audioPlayers.find(player => player.item_id === ownProps.item_id),
      newPlayer = new AudioPlayer(ownProps.item_id)

  newPlayer.paused = player ? player.paused : true;

  return {
    player: newPlayer
  }
}
export default connect<{}, {}, PlayPauseProps>(
  mapStateToProps, 
  mapDispatchToProps
)(PlayPauseButton)