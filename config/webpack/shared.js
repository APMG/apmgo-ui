const environment = require('./environment')
const OfflinePlugin = require('offline-plugin')

environment.plugins.set('OfflinePlugin', new OfflinePlugin())

module.exports = environment
