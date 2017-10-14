const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const url = require('url');

let ep = new eventproxy();
const cnodeUrl = 'https://cnodejs.org/';
let topicUrls = [];


superagent.get(cnodeUrl)
    .end((err, res) => {//获取所有连接的url
        if (err) {
            return console.error(err);
        }
        let topicUrls = [];
        let $ = cheerio.load(res.text);
        // topicUrls.push(('.topic_title_wrapper topic_title').attr('href'));//直接获取url不行，没有前缀
        $('#topic_list .topic_title').each(function (idx, element) {
            let $element = $(element);
            let href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });
        ep.after('topic_html', topicUrls.length, (topics) => {
            // console.log(topics);
            topics = topics.map((topicPair) => {
                let topicUrl = topicPair[0];
                let topicHtml = topicPair[1];
                const $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                    user1: $('.reply_author').eq(0).text().trim()
                });
            });

            console.log('final:');
            console.log(topics);
        });

        topicUrls.forEach((topicUrl) => {
            superagent.get(topicUrl)
                .end((err, res) => {
                    console.log('fetch ' + topicUrl + ' successful');
                    // console.log('res.text: ' + res.text);
                    ep.emit('topic_html', [topicUrl, res.text]);
                });
        });
    });




