// @flow
import React from 'react'
import { dispatch, connect } from 'react-redux'
import { updatePlayTime } from '../../redux/audio-player'
import Slider from 'material-ui/Slider'

type TimeScrubberProps = {
  audio: HTMLAudioElement,
  paused: boolean,
  item_id: number,
  currentTime: number,
  updatePlayTime: () => {}
}

export class TimeScrubberPresenter extends React.Component {

  props: TimeScrubberProps
  state: {
    timer: number|false,
    timeDraggingPoint: number|false
  }

  constructor(props: TimeScrubberProps) {
    let currentTime = 0;
    if(props.audio && props.audio.currentTime && !isNaN(props.audio.currentTime)) {
      currentTime = props.audio.currentTime
    }

    super(props)
    this.state = {
      timeDraggingPoint: false,
      timer: false
    }
  }

  componentWillReceiveProps(newProps: TimeScrubberProps) {
    if(newProps.paused) {
      this._stopTimer()
    } else {
      this._startTimer()
    }
  }

  playTimeDisplay() {
    if (!this.props.currentTime) {
      return "0:00"
    }

    let baseTime : number = this.props.currentTime;

    if (this.state.timeDraggingPoint) {
      baseTime = Math.floor(this.props.audio.duration * this.state.timeDraggingPoint)
    }

    let minutes = Math.floor(baseTime / 60),
        seconds = baseTime - (minutes * 60)

    return minutes + ":" + seconds.toString().padStart(2, '0')
  }

  timeScrubberValue() {
    if(!this.props.audio || isNaN(this.props.audio.duration)) {
      return 0
    }

    let val = this.props.currentTime / this.props.audio.duration
    return val <= 1 ? val : 1
  }

  // EVENT HANDLERS

  _timeChange(event: Event, newValue: number) {
    if (this.state.timeDraggingPoint) {
      this.setState({
        timeDraggingPoint: newValue
      })
    } else {
      // newValue is between 0 and 1
      this.props.audio.currentTime = this.props.audio.duration * newValue
      this.props.updatePlayTime()
    }
  }

  _timeChangeDragStart() {
    this.setState({
      timeDraggingPoint: this.props.audio.currentTime / this.props.audio.duration
    })
  }

  _timeChangeDragStop() {

    if (!this.props.audio || !this.state.timeDraggingPoint) {
      return
    }

    if (this.state.timeDraggingPoint) {
      this.props.audio.currentTime = this.props.audio.duration * this.state.timeDraggingPoint
      this.props.updatePlayTime()
    }

    this.setState({
      timeDraggingPoint: false
    })
  }

  // TIMERS

  _startTimer() {
    if (this.state.timer) {
      return
    }
    
    let timer = setInterval(() => {
      this.props.updatePlayTime()
    }, 1000)

    this.setState({
      timer: timer
    })
  }

  _stopTimer() {
    debugger
    if (!this.state.timer) {
      return
    }

    clearInterval(this.state.timer)

    this.setState({
      timer: false
    })
  }

  render() {
    return (
      <div>
        { this.playTimeDisplay() }
        <Slider
          value={ this.timeScrubberValue() }
          onChange={ this._timeChange.bind(this) }
          onDragStart={ this._timeChangeDragStart.bind(this) }
          onDragStop={this._timeChangeDragStop.bind(this) }
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePlayTime: () => {
      if (!ownProps.item_id) {
        return
      }
      let currentTime = Math.ceil(ownProps.audio.currentTime),
          action = updatePlayTime(ownProps.item_id, currentTime)

      dispatch(action)
    }
  }
}

const mapStateToProps = (newState) => {
  return {
    paused: newState.audioPlayer.paused,
    currentTime: Math.ceil(newState.audioPlayer.currentTime) || 0
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TimeScrubberPresenter)
