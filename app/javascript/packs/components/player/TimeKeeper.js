import React from 'react'
import { connect, dispatch } from 'react-redux'
import { updatePlayTime } from '../../redux/audio-player'

export default class TimeKeeperPresenter extends React.Component {

  props: {
    audio: HTMLAudioElement,
    updatePlayTime: () => {}
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
