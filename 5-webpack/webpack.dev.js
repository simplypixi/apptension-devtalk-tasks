'use strict';

const path = require('path');
const webpack = require('webpack');
const {defaultsDeep} = require('lodash');
const baseConfig = require('./webpack.base.js');
const {devConfig} = require('./src/modules/config');
const autoprefixer = require('autoprefixer');

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
      config$: path.resolve(__dirname, devConfig())
    }
  },
  plugins: [
    {}, {}, {}, {}, {},
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(false)
    })
  ]
});
