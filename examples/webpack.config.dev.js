var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: { filename: 'index.js' },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.join(__dirname),
        path.join(__dirname, '../src')
      ]
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  devServer: {
    open: true,
    port: 9904
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'index.html') },
      { from: path.join(__dirname, 'index.css') },
      { from: path.join(__dirname, 'tj-react-tab.css') },
      { from: path.join(__dirname, 'tj-react-auth-editor.css') }
    ])
  ]
}