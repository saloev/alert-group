const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeSass = require('node-sass');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  entry: {
    // shared: ['./src/common.js'],
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared',
    // },
    // sales: {
    //   import: './src/sales.js',
    //   dependOn: 'shared',
    // },
    common: path.resolve(__dirname, './src/common.js'),
    index: './src/index.js',
    sales: './src/sales.js',
  },

  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
    new HTMLWebpackPlugin({
      filename: 'sales.html',
      template: './src/views/sales/sales.html',
      chunks: ['sales', 'common'],
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index/index.html',
      chunks: ['index', 'common'],
    }),
    new VueLoaderPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: NodeSass,
              prependData: '@import "~@/scss/var.scss";',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jp(e)g)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[hash].[ext]',
          publicPath: '../',
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
          publicPath: '../',
        },
      },
    ],
  },
};
