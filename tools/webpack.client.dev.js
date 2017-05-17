/* I'm being a bad dude and disabling some eslint rules on a per file basis -- Byrne */
/* eslint-disable no-unused-vars */

const path = require('path');
const webpack = require('webpack');
const CONFIG = require('./webpack.base');

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG;

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      CLIENT_ENTRY,
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'aphrodite',
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT,
  },
  module: {
    preLoaders: [
      {
        // preloader used to be standard vs eslint-loader
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|server)/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      },
    ],
  },
  standard: {
    // config options to be passed through to standard e.g.
    parser: 'babel-eslint',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new webpack.NoErrorsPlugin(),
  ],
};
