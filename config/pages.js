'use strict';

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { isVendor } = require('./paths');

const directory = process.cwd();
const entries = {
  development: [],
  production: {}
};
const commonsChunk = [];
const env = process.env.NODE_ENV;

// Templates
const pages = fs.readdirSync(path.resolve(directory, 'src'))
  .filter((file) => {
    let template = file.split('.');
    let extension = template[1];

    return (extension === 'html');
  });

// Javascript
fs.readdirSync(path.resolve(directory, 'src/javascript/'))
  .filter((item) => {
    const file = item.split('.');
    const extension = file[1];

    return (extension === 'js');
  })
  .reduce((data, item) => {
    const file = item.split('.');
    const filename = file[0];
    const filejs = path.resolve(directory, 'src/javascript/', `${filename}.js`);
    const filecss = path.resolve(directory, 'src/styles/', `${filename}.pcss`);
    const vendor = new CommonsChunkPlugin({
      name: `v${filename}`,
      chunks: [filename],
      warnings: false,
      filename: `js/v${filename}.bundle.js`,
      minChunks: (module, count) => count >= 2 && isVendor(module)
    });

    if (env === 'production') {
      data[filename] = [filejs, filecss];
    } else {
      data[filename] = [
        'babel-polyfill',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client',
        filejs,
        filecss
      ];
    }

    commonsChunk.push(vendor);

    return data;
  }, entries[env]);

const options = {
  inject: true,
  hash: true,
  favicon: path.resolve(directory, 'src/favicon.ico'),
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
};

const assignTemplate = (template) => {
  const file = template.split('.');
  const filename = `${file[0]}.html`;
  const chunks = [`v${file[0]}`, file[0]];

  return Object.assign({
    chunks,
    filename,
    template: path.resolve(directory, 'src', template)
  }, options);
};

module.exports = {
  vendor: commonsChunk,
  entries: entries[env],
  pages: pages.map(template => new HtmlWebpackPlugin(assignTemplate(template)))
};
