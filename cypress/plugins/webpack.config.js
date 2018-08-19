const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader'],
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/docs')
        ],
      },
      { 
        test: /\.(html|css)$/, 
        loader: 'raw-loader',
        exclude: /\.async\.(html|css)$/
      },
      {
        test: /\.async\.(html|css)$/, 
        loaders: ['file?name=[name].[hash].[ext]', 'extract']
      }
    ]
  }
}