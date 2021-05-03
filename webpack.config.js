import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';
import webpack from 'webpack';

//import {HtmlWebpackPlugin}  from 'html-webpack-plugin';

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
    ],
  },

  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 5000,
  },
};
