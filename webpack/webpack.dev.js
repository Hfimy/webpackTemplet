// h5-single , 让开发变得更简单
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

  entry: { index: path.resolve(__dirname, '../src/index.js') },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
    // publicPath: './'
  },
  optimization: {
    runtimeChunk: { name: 'manifest' },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10
        },
        common: {
          test: /[\\/]src[\\/]/,
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
            name: 'image/[name].[hash:8].[ext]',
            publicPath: './'
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
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      title: 'h5-single',
      favicon: './src/favicon.ico',
      meta: {
        viewport: 'width=device-width, initial-scale=1,user-scalable=no',
        'format-detetion': 'telephone=no'
      }
    })
  ]
};
