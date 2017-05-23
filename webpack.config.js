module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    filename: 'butter_scroll.js',
    library: 'ButterScroll',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  }
}