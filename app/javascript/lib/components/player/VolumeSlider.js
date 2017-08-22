// @flow
import React from 'react'
import { connect, dispatch } from 'react-redux'
import Slider from 'material-ui/Slider'
import { volumeChange } from '../../redux/audio-player'

type VolumeSliderProps = {
  volume: number,
  updateVolume: () => {}
}

export default function(props: VolumeSliderProps) {
  return (
    <Slider
      value={ props.volume }
      onChange={ props.updateVolume }
    />
  )
}
