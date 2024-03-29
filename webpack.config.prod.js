const webpack = require('webpack');
const path = require('path');
const QiniuPlugin = require('qiniu-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const qiniu = require('./qiniu');
console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'production');

// 这里配置 Plugin
const qiniuPlugin = new QiniuPlugin({
  bucket: 'image-xinpinget',
  path: qiniu.endPoint,
});

module.exports = {
  entry: {
    bundle: ['babel-polyfill', './src/index.tsx'],
    vendor: ['babel-polyfill', 'react', 'react-dom', 'redux', 'redux-promise', 'redux-actions', 'react-router'],
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
        test: /\.tsx?$/,
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
