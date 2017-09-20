// @flow
import React from 'react'
import './AudioPlayer.scss'

export default function (props: {currentTime?: number}) {
  let { currentTime } = props

  if (!currentTime || isNaN(props.currentTime)) {
    return (<span styleName="currentTime">0:00</span>)
  }

  let minutes = Math.floor(currentTime / 60)
  let seconds = currentTime - (minutes * 60)
  let formatted = minutes + ':' + seconds.toString().padStart(2, '0')

  return (<span styleName="currentTime">{formatted}</span>)
}
