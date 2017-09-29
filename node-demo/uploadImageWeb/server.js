// let http =require('http');//node.js自带模块
// http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type': 'text/plain'});
//     response.write('hello world');
//     response.end();
// }).listen(8888);//监听8888端口

/*
**关于回调
*/
// let http = require('http');//node.js自带模块
// function onRequest(request, response) {
//     console.log("Request received.");//两次，因为浏览器会多请求一次icon
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.write("Hello World");
//     response.end();
// }
// http.createServer(onRequest).listen(8888);//监听8888端口
// console.log('Server has started.')

/*
**封装成模块,供其他模块引用
*/

// let http = require("http");//node.js自带模块
// let url = require("url")
// function start() {
//     function onRequest(request, response) {
//         console.log(request);
//         let pathname = url.parse(request.url).pathname;
//         console.log("Request for" + pathname + " received.");//两次，因为浏览器会多请求一次icon
//         response.writeHead(200, { "Content-Type": "text/plain" });
//         response.write('hello wrold');
//         response.end();//表示响应完成
//     }
//     http.createServer(onRequest).listen(8888);//监听8888端口
//     console.log('Server has started.')
// }

// exports.start = start;//node输出模块与es6输出模块有区别哦！es6:export {}


/*
**增加路由模块
*/

// var http = require("http");
// var url = require("url");

// function start(route) {//传入路由处理
//     function onRequest(request, response) {
//         var pathname = url.parse(request.url).pathname;
//         console.log("Request for " + pathname + " received.");

//         route(pathname);//路由模块用于处理url中的pathname

//         response.writeHead(200, { "Content-Type": "text/plain" });
//         response.write("Hello World");
//         response.end();
//     }

//     http.createServer(onRequest).listen(8888);
//     console.log("Server has started.");
// }

// exports.start = start;

/*
**增加请求处理程序
*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;