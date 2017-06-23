// @flow
import * as React from 'react'
import Slider from 'material-ui/Slider'

type VolumeSliderProps = {
  audio: HTMLAudioElement
}

export default class VolumeSlider extends React.Component {

  props: VolumeSliderProps

  state: {
    volume: number
  }

  constructor(props: VolumeSliderProps) {
    let volume = 1
    if (props.audio && props.audio.volume) {
      volume = props.audio.volume
    }

    super(props)
    this.state = {
      volume: volume
    }
  }

  _updateVolumeInState() {
    this.setState({
      volume: this.props.audio.volume
    })
  }

  _volumeChange(event: any, newValue: number) {
    if (!this.props.audio) {
      return
    }

    this.props.audio.volume = newValue
    this._updateVolumeInState()
  }

  render() {
    return (
      <Slider
        value={ this.state.volume }
        onChange={ this._volumeChange.bind(this)}
      />
    )
  }
}
