var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSCSS = new ExtractTextPlugin('./main.css');
var path = require('path');

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
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.scss$/,
        loader: extractSCSS.extract(['css?sourceMap','sass?sourceMap'])
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  plugins: [extractSCSS],
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    alias: {
      skeleton: path.join(__dirname, '/node_modules/skeleton-css/css/skeleton.css'),
      normalize: path.join(__dirname, '/node_modules/skeleton-css/css/normalize.css')
    }
  }
};