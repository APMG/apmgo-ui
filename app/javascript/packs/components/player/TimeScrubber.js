// @flow
import React from 'react'
import { dispatch, connect } from 'react-redux'
import { timeScrubberChange, updatePlayTime } from '../../redux/audio-player'
import Slider from 'material-ui/Slider'

type TimeScrubberProps = {
  paused: boolean,
  currentTime: number,
  duration: number,
  updatePlayTime: () => {},
  timeScrubberChange: () => {}
}

export class TimeScrubberPresenter extends React.Component {

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

    let val = this.props.currentTime / this.props.duration
    return val <= 1 ? val : 1
  }

  // EVENT HANDLERS

  _timeChange(event: Event, newValue: number) {
    if (this.state.timeDraggingPoint) {
      this.setState({
        timeDraggingPoint: newValue
      })
      this.props.updatePlayTime(this.props.duration * newValue)
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
      let currentTime = this.props.duration * this.state.timeDraggingPoint
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
          value={ this.timeScrubberValue() }
          onChange={ this._timeChange.bind(this) }
          onDragStop={this._timeChangeDragStop.bind(this) }
        />
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     updatePlayTime: (currentTime) => {
//       dispatch(updatePlayTime(ownProps.item_id, Math.ceil(currentTime)))
//     },
//     timeScrubberChange: (currentTime) => {
//       dispatch(timeScrubberChange(ownProps.item_id, Math.ceil(currentTime)))
//     }
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     currentTime: state.audioPlayer.currentTime,
//     duration: state.audioPlayer.duration,
//     paused: state.audioPlayer.paused
//   }
// }

export default TimeScrubberPresenter //connect(mapStateToProps, mapDispatchToProps)(TimeScrubberPresenter)
