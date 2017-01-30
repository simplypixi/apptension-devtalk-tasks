'use strict';

const path = require('path');
const {defaultsDeep} = require('lodash');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = defaultsDeep(baseConfig, {
  resolve: {
    alias: {
      config$: path.resolve(__dirname, 'src/env/prod/conf.js')
    }
  },
  plugins: [
    {},
    new HtmlWebpackPlugin({
      title: 'Prod main page',
      filename: 'index.html',
      hash: true,
      excludeChunks: ['unsupported']
    }),
    new HtmlWebpackPlugin({
      title: 'Prod unsupported page',
      filename: 'unsupported.html',
      hash: true,
      excludeChunks: ['main']
    })
  ]
});
