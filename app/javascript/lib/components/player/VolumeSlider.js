// @flow
import React from 'react'
import { connect, dispatch } from 'react-redux'
import { volumeChange } from '../../redux/audio-player'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type VolumeSliderProps = {
  volume: number,
  updateVolume: () => {}
}

export default function(props: VolumeSliderProps) {
  return (
    <Slider
      defaultValue={props.volume}
      onChange={props.updateVolume}
      onAfterChange={props.updateVolume}
      min={0}
      max={1}
      step={.01}
    />
  )
}
