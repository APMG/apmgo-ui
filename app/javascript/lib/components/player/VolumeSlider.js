// @flow
import React from 'react'

type VolumeSliderProps = {
  volume: number,
  updateVolume: (volume: number) => {}
}

export default function (props: VolumeSliderProps) {
  const updateVolume = (event: any) => {
    props.updateVolume(event.target.value)
  }

  return (
    <input
      type='range'
      value={props.volume}
      onInput={updateVolume}
      onChange={updateVolume}
      min={0}
      max={1}
      step={0.01}
    />
  )
}
