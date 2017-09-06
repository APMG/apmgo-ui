// @flow
import React, { Component } from 'react'
import withScrolling, { createVerticalStrength } from 'react-dnd-scrollzone'
import './Playlist.scss'

const ScrollingComponent = withScrolling('ul')
const linearVerticalStrength = createVerticalStrength(100)
// this easing function is from https://gist.github.com/gre/1650294 and
// expects/returns a number between [0, 1], however strength functions
// expects/returns a value between [-1, 1]
function ease (val) {
  const t = val / 2 + 1 // [-1, 1] -> [0, 1]
  const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  return easedT * 2 - 1 // [0, 1] -> [-1, 1]
}

function vStrength (box, point) {
  box.h = 300
  return ease(linearVerticalStrength(box, point))
}

export default class VerticalScrollingList extends Component {
  props: {
    children: Array<any>
  }
  render () {
    return (
      <ScrollingComponent styleName='c' verticalStrength={vStrength}>
        {this.props.children}
      </ScrollingComponent>
    )
  }
}
