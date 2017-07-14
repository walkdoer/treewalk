const MODULE_NAME = 'omelette:webpack:prod';
const debug = require('debug')(MODULE_NAME);
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const outputPath = path.resolve(process.cwd(), 'dist'); // 构建文件的输出路径
debug(`构建结果输出文件夹：${chalk.blue.underline(outputPath)}`);

const config = {
  entry: './src/index.js',
  resolve: {
    modules: [
      path.join(process.cwd(), 'src'),
      'node_modules',
    ],
  },
  output: {
    filename: 'bundle.js',
    library: 'treewalk',
    path: outputPath,
    libraryTarget: 'umd',  // 使用 umd 模式，详细参考文档 README.md/UMD模式
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
        test: /\.png$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};
module.exports = config;
