const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

function resolvePath(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const env = process.env.NODE_ENV;

const vendor = ['jquery'];

if (env !== 'production') {
  vendor.push('babel-polyfill');
}

module.exports = {
  context: resolvePath('src/'),
  script: resolvePath('src/index.js'),
  style: resolvePath('src/styles/style.pcss'),
  template: resolvePath('src/index.pug'),
  fonts: resolvePath('src/fonts/'),
  images: resolvePath('src/images/'),
  favicon: resolvePath('src/favicon.ico'),
  vendor,
  build: resolvePath('build'),
  port: process.env.PORT || 8080,
  isVendor: ({ resource }) => resource &&
    resource.indexOf('node_modules') >= 0 &&
    resource.match(/\.js$/)
};
