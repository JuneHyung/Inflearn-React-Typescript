const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval', // 'hidden-source-map'로 설정할 수 있음
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },
  entry: {
    app: './client' // client.tsx로 app.js를 만들 것이다.
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  }
};