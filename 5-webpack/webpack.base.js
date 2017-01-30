'use strict';

const path = require('path');
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
    }]
  },
  stats: {
    colors: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      config$: path.resolve(__dirname, 'src/env/local/conf.js'),
      copy: path.resolve(__dirname, 'src/copy.json')
    }
  },
  devtool: 'cheap-eval-source-map'
};