const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');
const cacheLoaderFactory  = require('./webpack/loaderConfig/cacheLoaderFactory');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TypeScript = require('typescript');
const Webpack = require('webpack');
const Vue = require('vue');
const colors = require('colors');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log('👴 前端老汉推车了 🚚 ...');
console.log('[--------------项目主要依赖版本--------------]'.green);
console.log(
  ` TypeScript ${TypeScript.version} `.bgBlue.white,
  ` Webpack ${Webpack.version} `.bgCyan.white,
  ` Vue ${Vue.version} `.bgGreen.white
);
console.log('\nWebpack 开始编译... 🚀'.cyan);

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    // filename: 'js/[name].[chunkhash:8].js',
    // chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      // css文件
      {
        test: /\.css$/i,
        exclude: /\.mod.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          cacheLoaderFactory('css-loader'),
          // 'thread-loader',
          // 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      // scss文件
      {
        test: /\.scss$/i,
        exclude: /\.mod.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          cacheLoaderFactory('scss-loader'),
          // 'thread-loader',
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // mod.css文件
      {
        test: /\.mod.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          cacheLoaderFactory('css-mod-loader'),
          // 'thread-loader',
          // 'style-loader',
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
          MiniCssExtractPlugin.loader,
          cacheLoaderFactory('scss-mod-loader'),
          // 'thread-loader',
          // 'style-loader',
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
              name: 'image/[hash:8].[ext]',
              limit: 2048,
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
              name: 'media/[hash:8].[ext]',
              limit: 2048,
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
              name: 'font/[hash:8].[ext]',
              limit: 2048,
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
      ':': path.join(process.cwd(), 'assets'),
      vue$: 'vue/dist/vue.esm.js',
    },
    modules: ['node_modules'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack测试页面',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
    }),
    new WebpackBar({
      color: 'pink',
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'public'),
        to: path.join(process.cwd(), 'dist'),
        ignore: ['readme.txt'],
      },
    ]),
    // new CompressionPlugin(),
    // 用来压缩Js代码
    // new MinifyJsPlugin({
    //   cache: true,
    //   parallel: true,
    // }),
    // new BundleAnalyzerPlugin(),
  ],
};
