const environment = require('./shared')
const merge = require('webpack-merge')
const env = require('process')

const myCssLoaderOptions = {
  minimize: env.NODE_ENV === 'production',
  modules: true,
  sourceMap: true,
  localIdentName: '[name]__[local]___[hash:base64:5]'
}

const CSSLoader = environment.loaders.get('style').use.find(el => el.loader === 'css-loader')

CSSLoader.options = merge(CSSLoader.options, myCssLoaderOptions)

let extractText = environment.plugins.get('ExtractText')
extractText.options = merge(extractText.options, {
  filename: '[name]-[contenthash].css',
  allChunks: true
})

module.exports = environment.toWebpackConfig()
