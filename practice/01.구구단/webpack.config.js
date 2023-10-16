const path = require('path');

module.exports={
  mode: 'development',
  devtool: 'eval', // hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  entry:{
    app: './client'
  },
  module:{
    rules:[{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env', {
              targets:{
                  browsers: ['last 2 chrome versions'],
              },
              debug: true,
          }
      ], 
        plugins: [''],
      },
    }],
  },

  plugins:[
    new webpack.LoaderOptionsPlugin({debug: true}),
  ],

  output:{
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  }
}