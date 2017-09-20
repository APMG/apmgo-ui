// @flow
import React from 'react'
import { toFormatted } from '../../service/formatTime'
import './AudioPlayer.scss'

export default function (props: {currentTime?: number}) {
  let { currentTime } = props

  if (!currentTime || isNaN(props.currentTime)) {
    return (<span styleName="currentTime">0:00</span>)
  }

  return (<span styleName="currentTime">{toFormatted(currentTime)}</span>)
}
