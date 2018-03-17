const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname)
  }
};
