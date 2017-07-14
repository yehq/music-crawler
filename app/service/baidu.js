const cheerio = require('cheerio');
const iconv = require('iconv-lite');

module.exports = app => {
    class BaiduService extends app.Service {
        async getTop() {
            const { ctx } = this;
            const { music_top_url } = app.config.baidu;
            const html = await this._get(music_top_url);
            return this.handleTop(html);
            // return html;
        }

        async getSong(id) {
            const { ctx } = this;
            const { music_info_url } = app.config.baidu;
            const result = await this._get(music_info_url, {
                data: {
                    song_id: id
                },
                dataType: 'JSON'
            });
            return result.data;
        }

        handleTop(html) {
            let $ = cheerio.load(html);
            const modMain = $('script')[20]
            const $modMain = $(modMain);
            const modMainHtml = $modMain.html().split('"html":"')[1].split('","onload":')[0];
            $ = cheerio.load(modMainHtml.replace(/\\n/g, '').replace(/\\\//g, '/').replace(/\\\"/g, '"'));
            const $mod = $('.mod');
            const music = {};
            $mod.each((index, item) => {
                const $this = $(item);
                const title = this.unicodeToChinese($this.find('.hd > .title').text().trim());
                const $lis = $this.find('.song');
                const list = [];
                $lis.each((index, item) => {
                    const $li = $(item);
                    const $info = $li.find('.info');
                    list.push({
                        num: $li.find('.num-top').text().trim(),
                        id: $li.data('id'),
                        aid: $li.data('aid'),
                        name: this.unicodeToChinese($info.find('.title > a').text().trim()),
                        artist: this.unicodeToChinese($info.find('.artist').text().trim()),
                        hot_num: this.unicodeToChinese($li.find('.hot-num').text().trim())
                    })
                })
                music[title] = list;
            })
            return music;
        }

        //Unicode transfer to Chinese
        unicodeToChinese(unicode) {
            return unescape(unicode.replace(/\\u/g, '%u'));
        }

        /**
         * get 请求抓取页面
         * @param {String} url 
         * @param {Object} data 
         * @param {String} method 
         */
        async _get(url, options = {}) {
            const { method = 'GET', dataType = 'text', data = {} } = options;
            const { ctx } = this;
            const { music_top_url } = app.config.baidu;
            const resp = await app.curl(url, {
                method,
                data,
                dataType,
                headers: {
                    Referer: `${music_top_url}`,
                },
            });
            if (resp.status !== 200) {
                if (resp.status === 302 || resp.status === 403) {
                    ctx.throw(403, '请重新登录！');
                } else {
                    ctx.throw(resp.status, '获取数据出错');
                }
            }
            return dataType.toUpperCase() === 'JSON' ? JSON.parse(resp.data) : resp.data.toString();
        }

        /**
         * post请求抓取页面
         * @param {String} url 
         * @param {Object} data 
         */
        async _post(url, data) {
            return this._get(url, data, 'POST');
        }
    }
    return BaiduService;
}