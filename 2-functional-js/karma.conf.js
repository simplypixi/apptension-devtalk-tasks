var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
 config.set({
  basePath: '',
  frameworks: ['jasmine'],

  reporters: ['coverage', 'mocha'],

  coverageReporter: {
    reporters: [{
      type: 'html',
      dir: 'coverage/'
    }]
  },

  port: 9876,
  colors: true,
  logLevel: config.LOG_INFO,
  autoWatch: true,
  browsers: ['Chrome'],
  singleRun: false,
  autoWatchBatchDelay: 300,

  files: ['./spec/test.index.js'],

  preprocessors: {
   './spec/test.index.js': ['webpack', 'sourcemap']
  },

  mochaReporter: {
    output: 'autowatch',
    showDiff: true
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    noInfo: true,
    stats: {
      colors: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: true
    }
  },

  plugins: [
    require('jasmine'),
    require('karma-webpack'),
    require('karma-coverage'),
    require('karma-jasmine'),
    require('karma-mocha'),
    require('karma-sourcemap-loader'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-matchers'),
    require('karma-mocha-reporter')
  ]
 });
}