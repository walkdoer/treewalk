/* eslint no-console: 0 */

const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const killable = require('killable');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { ip, log } = require('./util/webpack.helper');
const { DEV_SERVER_PORT } = require('./constants');
const webpackConfig = require('./webpack.config.dev');

let server;
let wdm;
let app;

logo();

function applyWebpackCompiler(config) {
  const app = express();
  console.log('运行目录' + process.cwd());
  app.use(express.static(process.cwd()));
  const compiler = webpack(config);
  compiler.plugin('compile', () => {
    log('开始构建...');
  });
  compiler.plugin('done', () => {
    log(chalk.green('webpack构建完成!'));
  });
  wdm = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
    // progress: true,
  });
  app.use(wdm);
  app.use(webpackHotMiddleware(compiler));

  return app;
}

function startServer(app, cb) {
  log(`正在启动服务器(端口号:${DEV_SERVER_PORT})...`);
  server = app.listen(DEV_SERVER_PORT, function(err) {
    if (err) {
      log('启动服务器失败');
      console.error(err);
      throw err;
    }
    log(chalk.green.bold('启动服务器成功'));
    cb();
  });
  server = killable(server);
  server.on('error', e => {
    if (e.code === 'EADDRINUSE') {
      log(`端口号${DEV_SERVER_PORT}被占用了，请使用其他端口号`);
    } else {
      throw e;
    }
  });
}


function stopServer(cb) {
  log('正在关闭开发服务器...');
  wdm.close(() => {
    wdm = null;
    log('关闭wdm成功');
    // log(server.kill);
    server.kill(() => {
      server = null;
      app = null;
      log('关闭服务器成功');
      cb();
    });
  });
}



app = applyWebpackCompiler(webpackConfig);
startServer(app, () => {
  const localHttpAddress = chalk.underline.blue(`http://localhost:${DEV_SERVER_PORT}`);
  const ipHttpAddress = chalk.underline.blue(`http://${ip}:${DEV_SERVER_PORT}`);
  log(`请访问 ${localHttpAddress} or ${ipHttpAddress}`);
});

process.on('SIGTERM', () => {
  stopServer(() => {
    log('退出成功');
    process.exit(0);
  });
});


function logo() {
  console.log(chalk.cyan(`
 _____  _____  _____  __     _____  _____  _____  _____
|     ||     ||   __||  |   |   __||_   _||_   _||   __|
|  |  || | | ||   __||  |__ |   __|  | |    | |  |   __|
|_____||_|_|_||_____||_____||_____|  |_|    |_|  |_____|
  `));
}
