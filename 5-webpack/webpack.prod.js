'use strict';

const path = require('path');
const webpack = require('webpack');
const {defaultsDeep} = require('lodash');
const baseConfig = require('./webpack.base.js');
const {prodConfig} = require('./src/modules/config');
const autoprefixer = require('autoprefixer');

module.exports = defaultsDeep(baseConfig, {
  resolve: {
    alias: {
      config$: path.resolve(__dirname, prodConfig())
    }
  },
  plugins: [
    {}, {}, {}, {}, {},
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(true)
    })
  ]
});
