'use strict';

const path = require('path');
const webpack = require('webpack');

const SpritesmithPlugin = require('webpack-spritesmith');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CSS_REGEX = /\.css$|\.scss$|\.sass$/;

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
    }, {
      test: /\.jpg$/,
      use: [ 'file-loader' ]
    }, {
      test: /\.png$/,
      loader: 'file-loader?name=i/[hash].[ext]'
    },{
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
    filename: '[name].bundle-[hash].js'
  },
  resolve: {
    modules: [
      'web_modules',
      'node_modules',
      'spritesmith-generated'
    ],
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      copy: path.resolve(__dirname, 'src/copy.json')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons-[hash].js',
      minChunks: 2
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'images/sprites'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.scss')
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Main page',
      hash: false,
      excludeChunks: ['unsupported']
    }),
    new HtmlWebpackPlugin({
      title: 'Unsupported page',
      filename: 'unsupported.html',
      hash: false,
      excludeChunks: ['main']
    }),
    new ExtractTextPlugin("styles-[hash].css")
  ]
};
