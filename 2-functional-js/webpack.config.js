var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSCSS = new ExtractTextPlugin('./main.css');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
				test: /.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			},
      {
        test: /\.scss$/,
        loader: extractSCSS.extract(['css?sourceMap','sass?sourceMap'])
      }
    ]
  },
  plugins: [extractSCSS]
};
