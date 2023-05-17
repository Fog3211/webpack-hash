const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dayjs = require('dayjs')

const baseDir = `${dayjs().format('YYYY-MM-DD HH:mm:ss')}/`

const jsHashMode = process.env.JS_HASH || 'hash'
const cssHashMode = process.env.CSS_HASH || 'hash'

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    index: './src/index.js',
    add: './src/add.js',
    sub: './src/sub.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `${baseDir}[name].[${jsHashMode}].js`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: `${baseDir}index.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new MiniCssExtractPlugin({
        filename: `${baseDir}[name].[${cssHashMode}].css`,
      }),
    ],
  },
};

