'use strict';
module.exports = appInfo => {
  const config = {

    // 加载 errorHandler 中间件
    middleware: ['errorHandler'],

    errorHandler: {
      match: '/',
    },

    cors: {
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    },

    keys: appInfo.name + '_1490928873243_4696',

    security: {
      csrf: false,
      domainWhiteList: ['localhost', 'http://localhost:8000'],
    },

    view: {
      mapping: {
        '.ejs': 'ejs',
      },
    },

    baidu: {
      music_url: 'http://y.baidu.com/',
      music_top_url: 'http://y.baidu.com/top',
      music_info_url: 'http://y.baidu.com/app/song/infolist'
    }
  };

  return config;
};
