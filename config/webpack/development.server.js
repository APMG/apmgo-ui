// Note: You must restart bin/webpack-dev-server for changes to take effect

const { resolve } = require('path')
const merge = require('webpack-merge')
const devConfig = require('./development.js')
const { devServer, publicPath, paths } = require('./configuration.js')
const fs = require('fs')

module.exports = merge(devConfig, {
  devServer: {
    https: {
      key: fs.readFileSync(process.env.BRAGI_KEY),
      cert: fs.readFileSync(process.env.BRAGI_CERT),
      ca: fs.readFileSync(process.env.BRAGI_CA),
    },
    host: devServer.host,
    port: devServer.port,
    compress: true,
    historyApiFallback: true,
    contentBase: resolve(paths.output, paths.entry),
    publicPath
  }
})
