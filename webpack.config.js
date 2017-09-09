const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/source/index.html',
  filename: 'index.html',
  inject: 'body'
});


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
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'

        }
        )
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
  plugins: [HtmlWebpackPluginConfig, extractSass],
  devServer: {
    historyApiFallback: true
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty'
  }
};
