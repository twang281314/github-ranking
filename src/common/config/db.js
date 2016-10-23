'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'sqlite',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: '',
      user: '',
      password: '',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    },
    sqlite: {
      path: "data/sqlite", //设置存储数据文件的目录
      prefix: '',
      database: 'github-ranking',
      encoding: 'utf8'
    }
  }
};