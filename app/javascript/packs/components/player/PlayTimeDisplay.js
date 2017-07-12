// @flow
import React from 'react'
import { connect } from 'react-redux'

export default function (props: {currentTime: number}) {
  if (typeof props.currentTime === undefined || isNaN(props.currentTime)) {
    return (<div>0:00</div>)
  }

  let minutes = Math.floor(props.currentTime / 60),
      seconds = props.currentTime - (minutes * 60),
      formatted = minutes + ":" + seconds.toString().padStart(2, '0')

  return (<div>{formatted}</div>)
}
