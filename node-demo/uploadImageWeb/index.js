/*
** @@ 主模块（程序入口）
*/

let server = require('./server');//服务器模块
let router = require('./router');//路由模块
let requestHandlers = require('./requestHandler');//处理程序

let handle = {};
/* 键值对形式，对应不同的处理函数，但是不应该放在这吧？不放到这server如何引用？ */
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route,handle);