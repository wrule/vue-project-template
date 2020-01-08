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
      // css文件
      {
        test: /\.css$/i,
        exclude: /\.mod.css$/i,
        use: [
          cacheLoaderFactory('css-loader'),
          'thread-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      // scss文件
      {
        test: /\.scss$/i,
        exclude: /\.mod.scss$/i,
        use: [
          cacheLoaderFactory('scss-loader'),
          'thread-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // mod.css文件
      {
        test: /\.mod.css$/i,
        use: [
          cacheLoaderFactory('css-mod-loader'),
          'thread-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[path][name]-[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      // mod.scss文件
      {
        test: /\.mod.scss$/i,
        use: [
          cacheLoaderFactory('scss-mod-loader'),
          'thread-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[path][name]-[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },

      // ts文件
      {
        test: /\.ts$/i,
        use: [
          cacheLoaderFactory('tsx-loader'),
          'thread-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      // tsx文件
      {
        test: /\.tsx$/i,
        use: [
          cacheLoaderFactory('tsx-loader'),
          'thread-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      // vue文件
      {
        test: /\.vue$/i,
        use: [
          cacheLoaderFactory('vue-loader'),
          'thread-loader',
          'vue-loader',
        ],
      },

      // 图片处理
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
            },
          },
        ],
      },
      // 媒体资源处理
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
            },
          },
        ],
      },
      // 字体资源处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.vue', '.json'],
    alias: {
      '@': path.join(process.cwd(), 'src'),
      ':': path.join(process.cwd(), 'static'),
      vue$: 'vue/dist/vue.esm.js',
    },
    modules: ['node_modules'],
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
    proxy: {},
  },
};
