'use strict';

const path = require('path');
const {defaultsDeep} = require('lodash');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = defaultsDeep(baseConfig, {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: true
    },
    noInfo: false
  },
  stats: {
    colors: true
  },
  devtool: 'cheap-eval-source-map',
  resolve: {
    alias: {
      config$: path.resolve(__dirname, 'src/env/local/conf.js')
    }
  },
  plugins: [
    {},
    new HtmlWebpackPlugin({
      title: 'Dev main page',
      filename: 'index.html',
      hash: false,
      excludeChunks: ['unsupported']
    }),
    new HtmlWebpackPlugin({
      title: 'Dev unsupported page',
      filename: 'unsupported.html',
      hash: false,
      excludeChunks: ['main']
    })
  ]
});
