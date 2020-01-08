const colors = require('colors');
const rimraf = require('rimraf');

console.log('清理dist目录...'.green);
rimraf.sync('dist');
