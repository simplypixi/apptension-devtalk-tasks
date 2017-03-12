const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CSS_REGEX = /\.css$|\.scss$|\.sass$/

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react']
      },
      include: [path.resolve(__dirname, 'src')]
    },
    {
      test: /\.jpg$/,
      use: [ 'file-loader']
    },
    {
      test: CSS_REGEX, 
      loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: [
        { loader: 'css-loader' },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader' }
        ]
      }),
    },
    {
      test: /\.(vert|frag)$/,
      loader: 'shader-loader'
    }]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};
