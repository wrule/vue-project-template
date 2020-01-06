const path = require('path');

console.log('你好，世界');
console.log(__dirname);

const v = path.join(process.cwd(), 'node_modules', '.cache', 'cache-loader');

console.log(v);
