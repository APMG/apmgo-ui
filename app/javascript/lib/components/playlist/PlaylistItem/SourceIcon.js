// @flow
import React, { Component } from 'react'

import './PlaylistItem.scss'

import apmgoConfig from '../../../config'

type SourceIconProps = {
  source: string
}

export default class SourceIcon extends Component {
  props: SourceIconProps

  _imgSrc () {
    let matchIcon = apmgoConfig.propertyIcons.get('default')
    apmgoConfig.propertyIcons.forEach(function(icon, url) {
      if(this._matchOriginUrl(url).test(this.props.source)) {
        matchIcon = icon
      }
    }.bind(this))

    return matchIcon
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
