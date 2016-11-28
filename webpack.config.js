module.exports = {
  entry: './src/index.js',
  output: {
    path: '.',
    filename: 'butter_scroll.js',
    library: 'ButterScroll',
    libraryTarget: 'umd'
  },
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2']
      }
    }
  ]
}