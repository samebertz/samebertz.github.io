const path = require('path')

const config = {
  entry: {
    boats: './boats/js/main.js',
    conway: './conway/js/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname)
  }
}

module.exports = config
