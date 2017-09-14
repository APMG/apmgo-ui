// Note: You must restart bin/webpack-dev-server for changes to take effect
const merge = require('webpack-merge')
const environment = require('./environment')

let uglifyPlugin = environment.find('UglifyJs')
uglifyPlugin.options = merge(uglifyPlugin.options, {sourceMap: true})

module.exports = environment.toWebpackConfig()
