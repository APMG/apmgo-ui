module.exports = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /(node_modules|bower_components|\.spec\.js)/,
  use: [
    {
      loader: 'webpack-strip-block'
    }
  ]
}
