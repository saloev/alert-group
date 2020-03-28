const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeSass = require('node-sass');
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
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build/js'),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      assets: path.resolve(__dirname, '../src/assets/'),
      views: path.resolve(__dirname, 'views/'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      filename: '../sales.html',
      template: './src/views/sales/sales.html',
      chunks: ['sales', 'common'],
    }),
    new HTMLWebpackPlugin({
      filename: '../index.html',
      template: './src/views/index/index.html',
      chunks: ['index', 'common'],
    }),
  ],

  module: {
    rules: [
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
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jp(e)g)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
