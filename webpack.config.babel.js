import path from 'path';

module.exports = {
  entry: path.join(__dirname, 'reactjsapp/index'),
  output: {
    path: path.join(__dirname, 'app/assets/javascripts'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: ['babel'], exclude: /node_modules/, include: __dirname,
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js'],
  },
};
