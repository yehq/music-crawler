'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = `
        <table>
          <tr>
            <th>url</th>
            <th>简介</th>
            <th>例子</th>
          <tr/>
          <tr>
            <td align='left'>GET '/baidu/top'</td>
            <td>获得百度音乐人热门歌曲</td>
            <td><a href="/baidu/top">/baidu/top</a></td>
          </tr>
          <tr>
            <td>GET '/baidu/song/:id'</td>
            <td>获得百度音乐人歌曲的详细信息</td>
            <td><a href="/baidu/song/397528">/baidu/song/397528</td>
          </tr>
        </table>
      `;
    }
  }
  return HomeController;
};
