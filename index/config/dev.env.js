var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
      //API:'"http://fabjwz.a6shop.net:"',
    // API:'"https://lease.xingkong.mx:"',
    API:'"http://bjwz_fa.hqshop.com:"',
    // PORT:'"8104"', // 8104
  // API:'"http://fagzxz.a6shop.net:"',
   PORT:'"8096"', // 8096
  //  PORT:'"443"', // 8104
  proxy:'"local"'
});
