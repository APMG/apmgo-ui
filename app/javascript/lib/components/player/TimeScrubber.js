// @flow
import React from 'react'
import { dispatch, connect } from 'react-redux'
import { timeScrubberChange, updatePlayTime } from '../../redux/audio-player'
import Slider from 'rc-slider'

type TimeScrubberProps = {
  paused: boolean,
  currentTime: number,
  duration: number,
  updatePlayTime: (playtime: number) => {},
  timeScrubberChange: (currentTime: number) => {}
}

export default class TimeScrubberPresenter extends React.Component {

  props: TimeScrubberProps
  state: {
    timeDraggingPoint: number|false
  }

  constructor(props: TimeScrubberProps) {
    super(props)
    this.state = {
      timeDraggingPoint: false
    }
  }

  timeScrubberValue() {
    if(!this.props.duration || isNaN(this.props.duration)) {
      return 0
    }

    return this.props.currentTime
  }

  // EVENT HANDLERS

  _timeChange(newValue: number) {
    if (this.state.timeDraggingPoint) {
      this.setState({
        timeDraggingPoint: newValue
      })
      this.props.updatePlayTime(newValue)
    } else {
      this.setState({
        timeDraggingPoint: newValue
      })
    }
  }

  _timeChangeDragStop() {
    if (!this.state.timeDraggingPoint) {
      return
    }

    if (this.state.timeDraggingPoint) {
      let currentTime = this.state.timeDraggingPoint
      this.props.timeScrubberChange(currentTime)
    }

    this.setState({
      timeDraggingPoint: false
    })
  }

  render() {
    return (
      <div>
        <Slider
          max={this.props.duration}
          min={0}
          value={this.timeScrubberValue()}
          onChange={ this._timeChange.bind(this) }
          onAfterChange={this._timeChangeDragStop.bind(this) }
        />
      </div>
    )
  }
}
