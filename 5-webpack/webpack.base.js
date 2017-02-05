'use strict';

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CSS_REGEX = /\.css$|\.scss$|\.sass$/

module.exports = {
  entry: {
    main: './src/main.js',
    unsupported: './src/unsupported.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      },
      include: [path.resolve(__dirname, 'src')]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
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
      })
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      copy: path.resolve(__dirname, 'src/copy.json')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2
    })
  ]
};
