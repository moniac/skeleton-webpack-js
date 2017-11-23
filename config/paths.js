const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

function resolvePath(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  context: resolvePath('src/'),
  fonts: resolvePath('src/fonts/'),
  images: resolvePath('src/images/'),
  favicon: resolvePath('src/favicon.ico'),
  build: resolvePath('build'),
  port: process.env.PORT || 8080,
  isVendor: ({ resource }) => resource &&
    resource.indexOf('node_modules') >= 0 &&
    resource.match(/\.js$/)
};
