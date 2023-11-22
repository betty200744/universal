const webpack = require('webpack');
const path = require('path');
const QiniuPlugin = require('qiniu-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const qiniu = require('./qiniu');
console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'production');

// 这里配置 Plugin
const qiniuPlugin = new QiniuPlugin({
  ACCESS_KEY: 'Tor2L7aBu0znCFOhe1KE-czP3yng0hkVN--Cj33Q',
  SECRET_KEY: 'iOxZi0M4kSZoLu5oibf95oHiiC7bfjafSawnik2Z',
  bucket: 'image-xinpinget',
  path: qiniu.endPoint,
});

module.exports = {
  entry: {
    bundle: ['./src/index.tsx'],
    vendor: ['react', 'react-dom', 'redux', 'redux-promise', 'redux-actions', 'react-router'],
  },
  output: {
    publicPath: `${qiniu.cdnPath}/`,
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    chunkFilename: '[name].[chunkhash:10].js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.less'],
  },

  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        use: [
          {
            loader: 'babel-loader',
          },
          'awesome-typescript-loader',
        ],
      },
      {
        test: /(\.jsx|\.js)$/,
        include: [path.resolve('./node_modules/@util'), path.resolve('./node_modules/@ui')],
        loader: 'babel-loader',
      },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      {
        test: /\.less$/, use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 }},
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new UglifyJsPlugin({
      sourceMap: false,
      cache: true,
      parallel: true,
      uglifyOptions: {
        minimize: true,
        unused: true,
        ecma: 5,
        ie8: false,
        warnings: false,
        compress: {
          warnings: process.env.NODE_ENV !== 'production',
          drop_console: process.env.NODE_ENV === 'production',
        },
      },
    }),
    qiniuPlugin,
  ],
};
