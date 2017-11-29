'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
  context,
  build,
  images,
  script,
  style,
  vendor
} = require('./paths');
const baseConfig = require('./webpack.config.base.js');

/*
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
*/

module.exports = webpackMerge(baseConfig, {
  entry: {
    app: [script, style],
    vendor
  },
  output: {
    path: build,
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(p|s)?css$/,
        include: context,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: false,
                localIdentName: '[local]', /* '[hash:base64:5]' */
                importLoaders: 1
              }
            },
            'postcss-loader',
            {
              loader: 'stylefmt-loader',
              options: {
                config: '.stylelintrc'
              }
            }
          ],
          publicPath: '../'
        })
      },
      // If you need optimized images, enable this
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        include: images,
        exclude: [/node_modules/],
        use: [
          // 'file-loader?name=[hash:10].[ext]&outputPath=img/',
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: '[hash:10].[ext]',
              outputPath: 'img/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                quality: 65,
                progressive: true
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                interlaced: false
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      // If you don't need optimized images, enable this
      /*
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        include: images,
        exclude: [/node_modules/],
        loader: 'file-loader?name=[name].[ext]&outputPath=img/'
      },
      */
      {
        enforce: 'pre',
        test: /\.(js|json)$/,
        include: context,
        exclude: [/node_modules/],
        loader: 'prettier-loader',
        options: {
          bracketSpacing: true,
          printWidth: 80,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          useTabs: false
        }
      }
    ]
  },
  plugins: [
    /*
    new PurifyCSSPlugin({
      moduleExtensions: [
        '.html',
        '.pug',
        '.js'
      ],
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(
        `${context}*`,
        { nodir: true }
      ),
      minimize: true,
      purifyOptions: {
        // Exclude some class names
        whitelist: ['*purify*'],
        info: true
      },
      styleExtensions: [
        '.css',
        '.pcss',
        '.scss'
      ]
    }),
    */
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        screw_ie8: false,
        unsafe_proto: true,
        dead_code: true,
        drop_debugger: true,
        // drop_console: true,
        warnings: false,
        if_return: true,
        booleans: true
      },
      output: {
        screw_ie8: false,
        beautify: false,
        comments: false
      },
      exclude: [/\.min\.js$/gi]
    })
  ],
  performance: {
    hints: false
  }
});
