/*
** @@ http服务器模块--接收请求，处理请求
*/

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
**将上面对pathname的处理拆成路由模块，当作参数引入
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

// var http = require("http");
// var url = require("url");

// function start(route, handle) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     route(handle, pathname);

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }


/*
**增加请求处理程序
**处理函数决定返回的页面内容->路由->server
*/

// var http = require("http");
// var url = require("url");

// function start(route, handle) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     let content = route(handle, pathname);

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write(content);
//     response.end();
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

/*
**将response->router模块->requestHandler模块，由requestHandler模块决定要返回的内容，而不是有本模块决定
**处理函数决定返回的页面内容->路由->server
*/

// var http = require("http");
// var url = require("url");

// function start(route, handle) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     route(handle, pathname, response);//多传一个response

//     // response.writeHead(200, {"Content-Type": "text/plain"});
//     // response.write(content);
//     // response.end();
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

// exports.start = start;

/*
**将response->router模块->requestHandler模块，由requestHandler模块决定要返回的内容，而不是有本模块决定
**node.js会把post过来的数据拆分成一个个数据块（如何做到的？）
**用回调函数的方式实现非阻塞,对接收的数据块进行监听
**@@在data事件回调中收集所有的POST数据，当接收到所有数据，触发end事件后，其回调函数调用请求路由，并将数据传递给它，然后，请求路由再将该数据传递给请求处理程序。
*/

// var http = require("http");
// var url = require("url");

// function start(route, handle) {
//   function onRequest(request, response) {
//     var postData = "";
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     request.setEncoding("utf8");//设置接收数据的编码格式为UTF-8

//     request.addListener("data", function (postDataChunk) {//注册data事件的监听器，用于收集每次接收到的新数据块，并将其赋值给postData变量
//       postData += postDataChunk;
//       console.log("Received POST data chunk " + postDataChunk + ".");//其实还是一坨给你
//     });

//     request.addListener("end", function () {//当接收到所有数据，触发end事件后,执行路由模块，只触发一次
//       route(handle, pathname, response, postData);
//     });

//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

// exports.start = start;


/*
**@@ 数据不需要再分块，直接将request传给router模块再传给requestHandler模块
**
**
**
*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;