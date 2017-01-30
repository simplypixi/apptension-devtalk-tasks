'use strict';

const path = require('path');
const {defaultsDeep} = require('lodash');
const baseConfig = require('./webpack.base.js');

module.exports = defaultsDeep(baseConfig, {
  devServer: {
    
  }
});