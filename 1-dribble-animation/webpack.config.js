module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: './src/',
        loaders: ['babel-preset-es2015']
      }
    ]
  }
};
