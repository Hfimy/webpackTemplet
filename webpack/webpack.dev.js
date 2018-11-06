const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { entryObj, htmlWebpackPluginArr, defineConfig } = require('./util');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    hot: true,
    open: true
  },
  entry: entryObj,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
  },
  optimization: {
    minimize: false,
    runtimeChunk: { name: 'manifest' },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10
        },
        common: {
          test: /[\\/]src[\\/]js[\\/]/,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.less'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.(css|less)$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: [path.resolve(__dirname, '../src')],
        use: {
          loader: 'url-loader',
          options: {
            limit: 8196,
            name: 'image/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(defineConfig),
    ...htmlWebpackPluginArr
  ]
};
