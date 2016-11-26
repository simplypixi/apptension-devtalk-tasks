module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
                              plugins: [
                        'transform-runtime',
                    ]
        }
      },
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
};