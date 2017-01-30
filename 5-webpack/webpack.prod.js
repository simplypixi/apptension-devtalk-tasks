'use strict';

const path = require('path');
const {defaultsDeep} = require('lodash');
const baseConfig = require('./webpack.base.js');

module.exports = defaultsDeep(baseConfig, {
  resolve: {
    alias: {
      config$: path.resolve(__dirname, 'src/env/prod/conf.js')
    }
  }
});