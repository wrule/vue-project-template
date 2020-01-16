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
    publicPath: '/',
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: [cacheLoaderFactory('vue-loader'), 'vue-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // scss文件
      {
        test: /\.scss$/i,
        exclude: /\.mod.scss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          cacheLoaderFactory('scss-loader'),
          // 'thread-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.mod.scss$/i,
        use: ['thread-loader', cacheLoaderFactory('css-loader'), 'style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]__[path][name]-[hash:base64:5]',
            },
          },
        }, 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.tsx$/i,
        use: [cacheLoaderFactory('tsx-loader'), 'thread-loader', 'babel-loader', {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
          },
        }],
      },
      {
        test: /\.ts$/i,
        use: [cacheLoaderFactory('ts-loader'), 'thread-loader', 'babel-loader', {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
          },
        }],
      },
      // 图片处理
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        use: 'url-loader',
      },
      // 媒体资源处理
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        loader: 'url-loader',
      },
      // 字体资源处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
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
    contentBase: path.join(process.cwd(), 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/api/acl': {
        target: 'http://midware.dev.perfma-inc.net:17920/',
        changeOrigin: false,
      },
      "/api/xspider": {
        target: "http://xspider.dev.perfma-inc.net:17934",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://xsea-u.dev.perfma-inc.net",
        changeOrigin: true,
        secure: false,
    },
      "/login": {
          target: 'http://login-u.dev.perfma-inc.net',
          changeOrigin: true,
          secure: false,
      },
    },
    historyApiFallback: true,
  },
};
