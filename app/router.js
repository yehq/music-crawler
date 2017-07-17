'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/baidu/top', 'baidu.top');
  app.get('/baidu/song/:id', 'baidu.song');
};
