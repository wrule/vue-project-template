/**
 * 用于生成各种loader的cache-loader
 * 主要是为cache-loader针对性的配置缓存路径
 * 具体的配置请查看 https://webpackjs.com/loaders/cache-loader/
 */
const path = require('path');

module.exports = (name) => {
  return {
    loader: 'cache-loader',
    options: {
      cacheDirectory: path.join(process.cwd(), 'node_modules', '.cache', 'cache-loader', name),
    },
  };
}
