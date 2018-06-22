const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    bundle: './src/index.tsx',
    vendor: ['react', 'react-dom', 'redux', 'redux-promise', 'redux-actions', 'react-router'],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 4053,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  output: {
    publicPath: '/dist',
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
        use: ['awesome-typescript-loader?configFileName=tsconfig.dev.json'],
      },
      {
        test: /(\.jsx|\.js)$/,
        include: [path.resolve('./node_modules/@util'), path.resolve('./node_modules/@ui')],
        loader: 'babel-loader',
      },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=[local][hash:base64:5]', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
  ],
};
