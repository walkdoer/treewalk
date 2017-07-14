const MODULE_NAME = 'omelette:webpack:prod';
const debug = require('debug')(MODULE_NAME);
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const { getEntries, getPagePlugins } = require('./util/webpack.helper');

const buildConfig = {
  output: {
    static: 'examples/',
    html: 'examples/',
  },
};

const staticOutputPath = path.resolve(process.cwd(), buildConfig.output.static);
const htmlOutputPath = path.resolve(process.cwd(), buildConfig.output.html);

debug(`构建结果输出文件夹：${chalk.blue.underline(staticOutputPath)}`);

module.exports = {
  entry: getEntries('./examples_src/*.js'),
  output: {
    filename: 'bundle.[name]_[chunkhash].js',
    path: staticOutputPath,
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
      }
    ],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),
    ...getPagePlugins('./examples_src/*.html', { outputPath: htmlOutputPath }),
  ],
};
