const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
// const env = require('./exportProcessEnv'); // only if you need to use env var in index.html

module.exports = (argv) => {
  const devMode = argv.mode !== 'production';

  return {
    entry: ['./src/index.js', './src/assets/main.scss'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    // resolve: {
    //   alias: {
    //     '/assets': path.resolve(__dirname, 'node_modules/path'), // if using a library
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.js', '.jsx'],
          },
          use: ['babel-loader'],
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: [
            { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader }, // Creates `style` nodes from JS strings
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      new Dotenv({ systemvars: true }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: './src/assets/images/favicon.ico',
        // gaTokenValue: env.GA_TOKEN, // example use of env var needed in index.html
      }),
      new CopyPlugin(
        {
          patterns: [
            { from: 'src/assets/images', to: 'assets/images' },
            { from: 'src/assets/css', to: 'assets/css' },
            { from: 'src/assets/files', to: 'assets/files' },
          ],
        },
      ),
      // This allows to pass env vars on runtime, see /nginx/run.sh and Dockerfile
      // it's probably not the best way to do this but it's how we're doing it in current projects
      new webpack.EnvironmentPlugin([
        'API_BASE_URL', // example use of env var used in React App only
      ]),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id]-[hash].css',
    })]),
    devServer: {
      historyApiFallback: true,
      hot: false,
      liveReload: true,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
    },
  };
};
