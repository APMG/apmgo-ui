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
    switch (true) {
      case this._matchOriginUrl('apmreports.org').test(this.props.source):
        return iconApmreports
      case this._matchOriginUrl('mprnews.org').test(this.props.source):
        return iconMpr
      case this._matchOriginUrl('prairiehome.org').test(this.props.source):
        return iconAphc
      case this._matchOriginUrl('thecurrent.org').test(this.props.source):
        return iconThecurrent
      default:
        return iconApm
    }
  }
  
  // TODO: handle beyond SLD
  _matchOriginUrl(urlToMatch: string): RegExp {
    var domain, sld, tld
    domain = urlToMatch.split('.')
    tld = domain.pop()
    sld = domain.pop()
    let matcher = new RegExp(
      "^" +
      "(https?:)?" + // Optional protocol, http or https
      "(\/\/)?" + // Optional double slash, with or without protocol
      "(www\.[a-z\.]*)?" + // Matches www subdomain, and env subdomains e.g. www.dev
      sld + "\." + tld
    )
    return matcher
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
