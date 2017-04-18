import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: path.join(__dirname, 'reactjsapp/index'),
  output: {
    path: path.join(__dirname, 'app/assets/javascripts'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: ['babel'], exclude: /node_modules/, include: __dirname,
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ],
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js'],
  },
};
