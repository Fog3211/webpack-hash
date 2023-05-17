const webpack = require('webpack')
const { default: select } = require('@inquirer/select')
const config = require('./webpack.config')

const choices = ['hash' , 'chunkhash' , 'contenthash'].map(u => ({
  name: u,
  value: u
}))

async function init() {
  const jsHash = await select({
    message: 'Select js hash mode',
    choices,
  });

  const cssHash = await select({
    message: 'Select css hash mode',
    choices,
  });

  console.log(jsHash, cssHash)
}

init()

webpack(config, (err, stats) => { })
