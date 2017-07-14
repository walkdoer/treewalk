const MODULE_NAME = 'omelette:webpack:helper';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const debug = require('debug')(MODULE_NAME);
const localIP = require('ip').address();
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');

debug(`${MODULE_NAME} boot`);

function log(str) {
  console.log(`${chalk.green('[omelette:webpack]')} ${str}`);
}

function getEntries(globPath, isDev) {
  const files = glob.sync(globPath);
  const entries = {};
  debug(`globpath: ${globPath}`);
  debug(`files: ${JSON.stringify(files, null, 2)}`);
  let entry,
    dirname,
    basename,
    pathname,
    extname;
  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = basename;
    debug(`入口: ${pathname}`);
    if (isDev) {
      entries[`${pathname}`] = [
        'webpack-hot-middleware/client?reload=true',
        entry,
      ];
    } else {
      entries[`${pathname}`] = [
        entry,
      ];
    }
  }
  debug(`entries: ${JSON.stringify(entries, null, 2)}`);
  return entries;
}

const getPagePlugins = (globPath, { isDev, outputPath } = {}) => {
  const files = glob.sync(globPath);
  debug(`文件列表: ${files.join(' , ')}`);
  return files.map(file => {
    const fileExt = path.extname(file);
    const fileBasename = path.basename(file, fileExt);
      // filename = path.resolve(outputPath, `./${fileBasename}/${fileBasename}${fileExt}`);
    const filename = path.resolve(outputPath, `./${fileBasename}${fileExt}`);
    debug(`${file} 模板文件输出到: ${filename}`);
    return new HtmlWebpackPlugin({
      // 因为在prod模式下，outputpath为 out/app/public, 所以 filename的输出路径也调整为 ../../views/${page}/${page}.html
      filename,
      template: file,
      // inject: false,  //js插入的位置，true/'head'/'body'/false
      // favicon = 'src/imgs/favicon.ico';
      inject: 'body',
      chunks: [ 'vendor', path.basename(file, path.extname(file)) ],
      alwaysWriteToDisk: isDev === true,
      // hash: false,
      /*
      * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
      * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
      * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
      * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
      */
      // minify: { //压缩HTML文件
      //  removeComments: true, //移除HTML中的注释
      //  collapseWhitespace: false //删除空白符与换行符
      // }
    });
  });
};


module.exports = {
  ip: localIP,
  log,
  getEntries,
  getPagePlugins,
};
