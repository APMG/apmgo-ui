// @flow
import React from 'react'
import { connect, dispatch } from 'react-redux'
import Slider from 'material-ui/Slider'
import { volumeChange } from '../../redux/audio-player'

type VolumeSliderProps = {
  updateVolume: () => {}
  // audio: HTMLAudioElement
}

export class VolumeSliderPresenter extends React.Component {

  props: VolumeSliderProps

  state: {
    volume: number
  }

  constructor(props: VolumeSliderProps) {
    let volume = 1

    super(props)
    this.state = {
      volume: volume
    }
  }

  _updateVolumeInState() {
    this.setState({
      volume: this.state.volume
    })
  }

  _volumeChange(event: any, newValue: number) {
    if (!this.props.audio) {
      return
    }

    this.state.volume = newValue
    this._updateVolumeInState()
  }

  render() {
    return (
      <Slider
        value={ this.state.volume }
        onChange={ this.props.updateVolume }
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateVolume: (event, newVolume) => {
      dispatch(volumeChange(newVolume))
    }
  }
}

export default connect(null, mapDispatchToProps)(VolumeSliderPresenter)
