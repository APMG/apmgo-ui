// @flow
import React, { Component } from 'react'

import './PlaylistItem.scss'

import iconAphc from '../../../../images/icon-aphc.png'
import iconApm from '../../../../images/icon-apm.png'
import iconApmreports from '../../../../images/icon-apmreports.png'
import iconMpr from '../../../../images/icon-mprnews.png'
import iconThecurrent from '../../../../images/icon-thecurrent.png'

type SourceIconProps = {
  source: string
}

export default class SourceIcon extends Component {
  props: SourceIconProps

  _imgSrc () {
    switch (this.props.source) {
      case '//apmreports.org':
        return iconApmreports
      case '//mprnews.org':
        return iconMpr
      case '//prairiehome.org':
        return iconAphc
      case '//thecurrent.org':
        return iconThecurrent
      default:
        return iconApm
    }
  }

  render () {
    return (
      <img
        styleName="origin_icon"
        src={this._imgSrc()}
        alt=""
      />
    )
  }
}
