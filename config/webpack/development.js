// Note: You must restart bin/webpack-dev-server for changes to take effect

const merge = require('webpack-merge')
const sharedConfig = require('./shared.js')
const webpack = require('webpack')
const path = require('path')


module.exports = merge(sharedConfig, {
  devtool: 'eval-source-map',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  }
})
