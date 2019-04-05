
const async = require('async');

//伪造数组
let urls = [];
for (let i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}
//并发连续输计数器
let concurrencyCount = 0;
let fetchUrl = (url, callback) => {
    // delay 的值在 2000 以内，是个随机的整数
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    setTimeout(function () {
        concurrencyCount--;
        callback(null, url + "html content")
    }, delay);
}
async.mapLimit(urls, 5, (url, callback) => {
    console.log(callback)
    fetchUrl(url, callback);
}, (err, result) => {
    console.log('finnal:');
    console.log(result);
})







