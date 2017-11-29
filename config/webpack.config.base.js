'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  context,
  fonts,
  favicon,
  template,
  isVendor
} = require('./paths');

module.exports = {
  context,
  module: {
    rules: [
      {
        test: /\.pug/,
        include: context,
        exclude: [/node_modules/],
        use: ['pug-loader']
      },
      {
        test: /\.js?$/,
        include: context,
        exclude: [/node_modules/],
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.(eot|ttf|otf|svg|woff2?)(\?.*)?$/,
        include: fonts,
        exclude: [/node_modules/],
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      title: 'Movistar',
      favicon,
      inject: true,
      hash: true,
      template,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js',
      minChunks: (module, count) => count >= 2 && isVendor(module)
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    modules: [
      context,
      'node_modules'
    ],
    extensions: ['.js', '.json']
  }
};
