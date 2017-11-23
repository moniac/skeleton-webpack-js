'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const {
  context,
  build,
  images
} = require('./paths');
const baseConfig = require('./webpack.config.base.js');

module.exports = webpackMerge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: build,
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(p|s)?css$/,
        include: context,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              modules: false,
              localIdentName: '[local]',
              sourceMap: true,
              importLoaders: 1
            }
          },
          'postcss-loader?sourceMap'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        include: images,
        exclude: [/node_modules/],
        loader: 'file-loader?name=[name].[ext]&outputPath=img/'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
