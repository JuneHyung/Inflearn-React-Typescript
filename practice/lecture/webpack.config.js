const path = require('path');

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
        plugins:['@babel/plugin-proposal-class-properties'],
      }
    }],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }, // 출력
};