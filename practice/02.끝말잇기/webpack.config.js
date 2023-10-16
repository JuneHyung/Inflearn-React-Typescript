const path = require('path');
const RefreshWebpackPlugin = requier('@pmmmwh/react-refresh-webpack-plugin');

module.exports={
  name:'word-relay-setting', // 웹팩설정의 이름.
  mode: 'development', // 실서비스 : production
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: ['./client.jsx'],
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options:{ // babel의 옵션
        presets:['@babel/preset-env', '@babel/preset-react'],
        plugins:['react-refresh/babel'],
      }
    }],
  },
  plugins:[
    new RefreshWebpackPlugin
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  }, // 출력
  devServer:{
    devMiddleware: {publicPath: '/dist'},
    static: {directory: path.join(__dirname, 'dist')},
    hot: true,
  }
};