import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
      { test: /\.scss/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      },
      { test: /\.css/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
