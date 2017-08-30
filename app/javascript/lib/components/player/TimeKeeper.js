// @flow

import React from 'react'
import { connect } from 'react-redux'
import { updatePlayTime } from '../../redux/audio-player'

type TimeKeeperPresenterProps = {
  audio: HTMLAudioElement,
  updatePlayTime: (currentTime: number) => {}
}

export default class TimeKeeperPresenter extends React.Component {

  props: TimeKeeperPresenterProps
  state: {
    timer?: number|false
  }

  constructor(props: TimeKeeperPresenterProps) {
    super(props)
    this.state = {
      timer: false
    }
  }

  componentWillReceiveProps(newProps: TimeKeeperPresenterProps) {
    let playing = !newProps.audio.paused

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
