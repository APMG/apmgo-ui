const { environment } = require('@rails/webpacker')
const OfflinePlugin = require('offline-plugin')

environment.plugins.set('OfflinePlugin', new OfflinePlugin())
module.exports = environment
