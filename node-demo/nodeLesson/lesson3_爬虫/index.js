const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

let app = new express();

app.get('/', (req, res, next) => {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/')
        .end((err, sres) => {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            const $ = cheerio.load(sres.text);
            let items = [];
            $('#topic_list .topic_title').each((idx, element) => {
                let $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                    author: $element.parent('.topic_title_wrapper').siblings('.user_avatar').find('img').attr('title')
                });
            });
            res.send(items);
        });
});

app.listen(3000,()=>{
    console.log('app is running at port 3000');
});
