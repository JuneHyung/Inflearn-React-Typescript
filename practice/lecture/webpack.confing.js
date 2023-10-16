const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',// production
  devetool: 'eval', // production인 경우 hidden-source-map
  resolve:{
    extensions: ['jsx', 'js', 'tsx', 'ts']
  },

  entry: {
    app: './client' // client.tsx로 app.js를 만들 것이다.
  },
  module: {
    rules: [{
      test: /\.tsx?$/, 
      loader: 'ts-loader'
    }]
  },
  plugins: [

  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  }
}