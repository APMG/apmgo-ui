import * as React from 'react'
import { dispatch, connect } from 'react-redux'
import Slider from 'material-ui/Slider';

type TimeSliderProps = {
  audio: HTMLAudioElement,
  paused: boolean
}

class TimeSlider extends React.Component {

  props: TimeSliderProps
  timeDraggingPoint: number
  updatingWithDrag: boolean
  state: {
    currentTime: number,
    timer: number
  }

  constructor(props: TimeSliderProps) {
    let currentTime = 0;
    if(props.audio && props.audio.currentTime && !isNaN(props.audio.currentTime)) {
      currentTime = props.audio.currentTime
    }

    super(props)
    this.state = {
      currentTime: currentTime
    }
  }

  render() {
    return (
      <div>
        { this.playTimeDisplay() }
        <Slider
          value={ this.timeSliderValue() }
          onChange={ this._timeChange.bind(this) }
          onDragStart={ this._timeChangeDragStart.bind(this) }
          onDragStop={this._timeChangeDragStop.bind(this) }
        />
      </div>
    )
  }

  componentWillReceiveProps(newProps) {
    if (newProps.paused === this.props.paused) {
      return
    }

    if(!newProps.paused) {
      this._startTimer()
    } else {
      this._stopTimer()
    }
  }

  playTimeDisplay() {
    if (!this.state.currentTime) {
      return "0:00"
    }

    let baseTime = this.state.currentTime;

    if (this.timeDraggingPoint) {
      baseTime = Math.floor(this.props.audio.duration * this.timeDraggingPoint)
    }

    let minutes = Math.floor(baseTime / 60),
        seconds = baseTime - (minutes * 60)

    return minutes + ":" + seconds.toString().padStart(2, '0')
  }

  timeSliderValue() {
    if(!this.props.audio || isNaN(this.props.audio.duration)) {
      return 0
    }

    let val = this.state.currentTime / this.props.audio.duration
    return val <= 1 ? val : 1
  }

  // EVENT HANDLERS

  _timeChange(event, newValue: number) {
    if (this.timeDraggingPoint) {
      this.timeDraggingPoint = newValue
      console.log('change with drag', newValue)
      this.updatingWithDrag = true
    } else {
      // newValue is between 0 and 1
      this.props.audio.currentTime = this.props.audio.duration * newValue
      this.updatingWithDrag = false
      this._updateTimeInState()
    }
  }

  _timeChangeDragStart() {
    this.timeDraggingPoint = this.props.audio.currentTime / this.props.audio.duration
  }

  _timeChangeDragStop() {

    if (!this.props.audio || typeof this.timeDraggingPoint === 'undefined') {
      return
    }

    if (this.updatingWithDrag) {
      this.props.audio.currentTime = this.props.audio.duration * this.timeDraggingPoint
      this._updateTimeInState()
    }

    delete this.timeDraggingPoint
  }

  // TIMERS

  _startTimer() {
    this._timer = setInterval(() => {
      this._updateTimeInState()
    }, 1000)
  }

  _stopTimer() {
    if(this._timer) {
      clearInterval(this._timer)
      delete this._timer
    }
  }

  _updateTimeInState() {
    this.setState({
      currentTime: Math.ceil(this.props.audio.currentTime)
    })
  }
}

const mapStateToProps = (newState) => {
  return {
    paused: newState.audioPlayer.paused
  }
}

export default connect(mapStateToProps)(TimeSlider)
