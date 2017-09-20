// @flow
import React from 'react'
import { toFormatted } from '../../service/formatTime'
import './AudioPlayer.scss'

export default function (props: {duration?: number}) {
  let { duration } = props

  if (!duration || isNaN(props.duration)) {
    return (<span styleName="duration">0:00</span>)
  }

  return (<span styleName="duration">{toFormatted(duration)}</span>)
}
