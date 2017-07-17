'use strict';

module.exports = app => {
  class BaiduController extends app.Controller {
    async index() {
      this.ctx.body = 'hi, egg';
    }
    async top() {
        const { service, ctx } = this;
        const result = await service.baidu.getTop();
        ctx.body = {
            result
        };
    }
    async song() {
        const { service, ctx } = this;
        const { id } = ctx.params;
        const song = await service.baidu.getSong(id);
        ctx.body = {
            song
        };
    }
  }
  return BaiduController;
};
