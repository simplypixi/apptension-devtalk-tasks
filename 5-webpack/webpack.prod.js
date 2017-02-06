'use strict';

const path = require('path');
const webpack = require('webpack');
const {defaultsDeep} = require('lodash');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {prodConfig} = require('./src/modules/config');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = defaultsDeep(baseConfig, {
  resolve: {
    alias: {
      config$: path.resolve(__dirname, prodConfig())
    }
  },
  plugins: [
    {},
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      title: 'Prod main page',
      hash: true,
      excludeChunks: ['unsupported']
    }),
    new HtmlWebpackPlugin({
      title: 'Prod unsupported page',
      filename: 'unsupported.html',
      hash: true,
      excludeChunks: ['main']
    }),
    new ExtractTextPlugin("styles.css")
  ]
});
