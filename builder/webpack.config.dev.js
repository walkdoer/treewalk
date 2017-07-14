const MODULE_NAME = 'omelette:webpack:dev';
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const debug = require('debug')(MODULE_NAME);
const path = require('path');
const chalk = require('chalk');
const { getEntries, getPagePlugins } = require('./util/webpack.helper');

debug(`源代码目录:  ${chalk.blue.underline(path.join(process.cwd(), 'src'))}`);
const htmlOutputPath = path.join(process.cwd(), 'examples');
const dllDir = path.join(__dirname, '../dist');
module.exports = {
  devtool: 'source-map',
  entry: getEntries('./examples_src/*.js', true),
  resolve: {
    modules: [
      path.join(process.cwd(), 'src'),
      'node_modules',
    ],
  },
  output: {
    filename: 'bundle.[name].js',
  },
  devServer: {
    hot: true,
    inline: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    ...getPagePlugins('./examples_src/*.html', { isDev: true, outputPath: htmlOutputPath }),
  ],
};
