import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: path.join(__dirname, 'reactjsapp/index'),
  output: {
    path: path.join(__dirname, 'app/assets/javascripts'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin('process.env.NODE_ENV': JSON.stringify('production')),
    new webpack.optimize.DedupePlugin(),
  ],
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
