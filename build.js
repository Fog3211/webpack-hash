const webpack = require('webpack')
const { default: select } = require('@inquirer/select')
const config = require('./webpack.config')
const { spawn } = require('child_process');

const choices = ['hash:6', 'chunkhash:7', 'contenthash:8'].map(u => ({
  name: u,
  value: u
}))

async function selectMode() {
  const jsHash = await select({
    message: 'Select js hash mode',
    choices,
  });

  const cssHash = await select({
    message: 'Select css hash mode',
    choices,
  });

  return [jsHash, cssHash]
}

async function init() {
  const [jsHash, cssHash] = await selectMode()

  process.env.JS_HASH = jsHash
  process.env.CSS_HASH = cssHash

  // 执行Webpack
  const webpackProcess = spawn('webpack');

  // 监听Webpack的输出
  webpackProcess.stdout.on('data', data => {
    console.log(data.toString());
  });

  webpackProcess.stderr.on('data', data => {
    console.error(data.toString());
  });
}

init()
