const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  stats: 'errors-warnings',

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 9000,
    compress: false,
  },
});
