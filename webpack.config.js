const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cacheLoaderFactory  = require('./webpack/loaderConfig/cacheLoaderFactory');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: 'url-loader',
      },
      {
        test: /\.vue$/,
        use: [cacheLoaderFactory('vue-loader'), 'vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.mod.scss$/,
        use: [cacheLoaderFactory('css-loader'), 'style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]__[path][name]-[hash:base64:5]',
            },
          },
        }, 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.tsx$/,
        use: [cacheLoaderFactory('tsx-loader'), 'babel-loader', 'ts-loader'],
      },
      {
        test: /\.ts$/,
        use: [cacheLoaderFactory('ts-loader'), 'babel-loader', 'ts-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.vue', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack测试页面',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
    }),
    new VueLoaderPlugin(),
    new WebpackBar({
      color: '#2baaff',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    proxy: {},
  },
};
