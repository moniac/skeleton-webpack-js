// https://github.com/BrowserSync/recipes/blob/master/recipes/webpack.react-hot-loader/app.js
/**
 * Require Browsersync along with webpack and middleware for it
 */
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
const webpackConfig = require('./config/webpack.config.development');
const paths = require('./config/paths');

const bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
  server: {
    baseDir: 'build',

    middleware: [
      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        compress: true,
        noInfo: false,
        historyApiFallback: true,
        stats: 'errors-only',
        overlay: {
          warnings: true,
          errors: true
        }
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },
  open: true,
  browser: 'chrome',
  minify: true,
  port: paths.port,
  notify: true,
  files: ['build/*.html']
});
