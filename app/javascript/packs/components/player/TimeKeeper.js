import React from 'react'
import { connect, dispatch } from 'react-redux'
import { updatePlayTime } from '../../redux/audio-player'

export class TimeKeeperPresenter extends React.Component {

  props: {
    audio: HTMLAudioElement,
    item_id: number
  }
  state: {
    timer?: number|false
  }

  constructor(props: TimeScrubberProps) {
    super(props)
    this.state = {
      timer: false
    }
  }

  componentWillReceiveProps(newProps: TimeScrubberProps) {
    let playing = !newProps.paused

    if(playing) {
      this._startTimer()
    } else {
      this._stopTimer()
    }
  }

  _startTimer() {
    if (this.state.timer) {
      return
    }

    let timer = setInterval(() => {
      this.props.updatePlayTime(this.props.audio.currentTime)
    }, 1000)

    this.setState({
      timer: timer
    })
  }

  _stopTimer() {
    if (!this.state.timer) {
      return
    }

    clearInterval(this.state.timer)

    this.setState({
      timer: false
    })
  }

  render() {
    return (<div></div>)
  }
}

const mapStateToProps = (state) => {
  return {
    item_id: state.audioPlayer.currentTrackId,
    paused: state.audioPlayer.paused
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePlayTime: (currentTime) => {
      dispatch(updatePlayTime(ownProps.item_id, Math.ceil(currentTime)))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeKeeperPresenter)
