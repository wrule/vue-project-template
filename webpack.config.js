const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cacheLoaderFactory  = require('./webpack/loaderConfig/cacheLoaderFactory');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TypeScript = require('typescript');
const colors = require('colors');
const Webpack = require('webpack');
const Vue = require('vue');
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
  mode: 'development',
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
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // extractComments: false,
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    namedChunks: true,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
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
  devServer: {
    open: true,
    hot: true,
    contentBase: path.join(process.cwd(), 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    proxy: {},
    clientLogLevel: 'warning',
    // webpack-dev-server重写404响应
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    historyApiFallback: true,
  },
};
