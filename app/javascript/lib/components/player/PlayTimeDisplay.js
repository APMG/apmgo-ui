// @flow
import React from 'react'

export default function (props: {currentTime?: number}) {
  let { currentTime } = props

  if (!currentTime || isNaN(props.currentTime)) {
    return (<div>0:00</div>)
  }

  let minutes = Math.floor(currentTime / 60)
  let seconds = currentTime - (minutes * 60)
  let formatted = minutes + ':' + seconds.toString().padStart(2, '0')

  return (<div>{formatted}</div>)
}
