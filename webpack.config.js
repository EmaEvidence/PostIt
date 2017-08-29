const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  entry: ['./client/index.js', './client/scss/main.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        loaders: [
          'file-loader',
          'image-webpack-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
  devServer: {
    historyApiFallback: true
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty'
  }
};
