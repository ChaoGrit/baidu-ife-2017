/*
** @@ 路由模块--对不同url执行不同的响应
** @@ 响应即请求处理函数
*/


// @@没有加处理函数的
// function route(pathname) {//用于处理url路径
//     console.log("About to route a request for " + pathname);
// }

// @@有处理函数的，根据路径调用不同处理函数，直接执行

// function route(handle,pathname) {//用于处理url路径
//     console.log("About to route a request for " + pathname);
//     if(typeof handle[pathname] === 'function'){
//         handle[pathname]();//直接调用相应的处理函数
//     }else{
//         console.log("No request handler found for " + pathname);
//     }
// }

// @@有处理函数的，根据路径调用不同处理函数，得到由处理函数返回页面的内容，再传给server
// @@但这是不好的实现方式：当未来有请求处理程序需要进行非阻塞的操作的时候，我们的应用就“挂”了。

// function route(handle,pathname) {//用于处理url路径
//     console.log("About to route a request for " + pathname);
//     if(typeof handle[pathname] === 'function'){
//         return handle[pathname]();
//     }else{
//         console.log("No request handler found for " + pathname);
//         return "404 Not found";
//     }
// }

// @@有处理函数的，根据路径调用不同处理函数，得到由处理函数返回页面的内容，再传给server
// @@多传一个response参数给requestHandler模块

// function route(handle,pathname,response) {//用于处理url路径，多传一个response
//     console.log("About to route a request for " + pathname);
//     if(typeof handle[pathname] === 'function'){
//         return handle[pathname](response);
//     }else{//无处理时返回
//         console.log("No request handler found for " + pathname);
//         response.writeHead(404, {"Content-Type": "text/plain"});
//         response.write("404 Not found");
//         response.end();
//     }
// }

// @@有处理函数的，根据路径调用不同处理函数，得到由处理函数返回页面的内容，再传给server
// @@传response & postData 给requestHandler模块

function route(handle, pathname, response, postData) {//用于处理url路径，多传一个response
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response,postData);
    } else {//无处理时返回
        console.log("No request handler found for " + pathname);
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;