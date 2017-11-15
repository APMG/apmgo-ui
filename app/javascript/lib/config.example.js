// External link icon from Octicon project https://github.com/primer/octicons
// Copyright (c) 2012-2017 GitHub, Inc.
import iconExample from '../images/icon-example.png'

const apmgoConfig = {
  apiEndpoint: 'https://apmgo-api.example.org',
  actionCableEndpoint: 'wss://apmgo-api.example.org/cable',
  accountPath: 'https://accounts.example.org',
  propertyIcons: new Map([
    ['default', iconExample]
  ]) 
}

export default apmgoConfig
