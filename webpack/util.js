const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.resolve(__dirname, '../src');
const destPathArr = fs.readdirSync(sourcePath).filter(filterHandler);

const entryObj = {};
const htmlWebpackPluginArr = [];
const defineConfig = getDefineConfig();

destPathArr.forEach(fillHandler);

function filterHandler(item) {
  return (
    fs.statSync(path.resolve(sourcePath, item)).isDirectory() &&
    item !== 'common'
  );
}

function fillHandler(item) {
  const dirName = path.resolve(sourcePath, item);
  entryObj[item] = path.resolve(dirName, 'index.js');
  htmlWebpackPluginArr.push(createHtmlWebpackPluginObj(item, dirName));
}

function createHtmlWebpackPluginObj(item, dirName) {
  const flag = getEnvFlag();
  return new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve(dirName, 'index.html'),
    filename: `${item}.html`,
    meta: {
      viewport: 'width=device-width, initial-scale=1,user-scalable=no',
      'format-detetion': 'telephone=no'
    },
    chunks: [item, 'manifest'],
    /* eslint-disable */
    minify:
      flag === 'dev'
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
    /* eslint-enable */
  });
}

function getEnvFlag() {
  return process.env.ENV_FLAG;
}

function getDefineConfig() {
  const flag = getEnvFlag();
  /* eslint-disable */
  switch (flag) {
    case 'dev':
    case 'test':
      return require('../config/dev');
    case 'prod':
      return require('../config/prod');
  }
  /* eslint-enable */
}

module.exports = {
  entryObj,
  htmlWebpackPluginArr,
  defineConfig
};
