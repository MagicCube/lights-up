const path = require('path');

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  devtool: 'cheap-module-source-map',
  // target: 'electron-renderer',
  devServer: {
    contentBase: path.resolve('./public'),
    disableHostCheck: true,
    quiet: true,
    port: 3000
  },
  plugins: [new ErrorOverlayPlugin()]
});
