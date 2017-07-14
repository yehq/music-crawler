'use strict';

module.exports = app => {
  class NeteaseController extends app.Controller {
    async index() {
      this.ctx.body = 'hi, egg';
    }
  }
  return NeteaseController;
};
