// @flow
import React from 'react'
import './AudioPlayer.scss'

export default function (props: {duration?: number}) {
  let { duration } = props

  if (!duration || isNaN(props.duration)) {
    return (<span styleName="duration">0:00</span>)
  }

  let timeInSeconds = Math.round(duration)

  let formattedTime = ''
  let formattedMinutes = ''
  let formattedSeconds = ''
  let hours = Math.floor(timeInSeconds / 3600)
  let minutes = Math.floor((timeInSeconds / 60) - (hours * 60))
  let seconds = timeInSeconds - (minutes * 60) - (hours * 3600)

  if (hours !== 0) {
    formattedTime = hours + ':'

    if (minutes < 10) {
      formattedMinutes = '0' + minutes
    } else {
      formattedMinutes = minutes.toString()
    }
  } else {
    formattedMinutes = minutes.toString()
  }

  if (seconds < 10) {
    formattedSeconds = '0' + seconds
  } else {
    formattedSeconds = seconds.toString()
  }

  formattedTime = formattedTime + formattedMinutes + ':' + formattedSeconds

  return (<span styleName="duration">{formattedTime}</span>)
}
