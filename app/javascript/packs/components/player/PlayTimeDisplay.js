import React from 'react'

export default function (props: {currentTime: number}) {
  if (!props.currentTime) {
    return (<div>0:00</div>)
  }

  let minutes = Math.floor(props.currentTime / 60),
      seconds = props.currentTime - (minutes * 60),
      formatted = minutes + ":" + seconds.toString().padStart(2, '0')

  return (<div>{formatted}</div>)
}
