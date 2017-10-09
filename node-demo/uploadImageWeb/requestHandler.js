/*
** @@ 请求处理程序模块--
*/

// @@处理函数
// @@每个函数只做处理，不进行路径的判断（那是路由做的事？）
// function start() {
//     console.log("Request handler 'start' was called.");
// }

// function upload() {
//     console.log("Request handler 'upload' was called.");
// }

// @@处理函数--返回对应的内容,返回给路由，再由路由返回给服务器，再展示到页面上
// @@但这是不好的实现方式：当未来有请求处理程序需要进行非阻塞的操作的时候，我们的应用就“挂”了。
// @@对start进行休眠10s操作，对upload不作处理
// @@结果防线对/upload路径的请求要在/start路径请求后才能执行
// @@原因就是start()包含了阻塞操作。形象的说就是“它阻塞了所有其他的处理工作”。
// @@解决方案：回调函数
// function start() {
//     console.log("Request handler 'start' was called.");
//     function sleep(milliSeconds){
//         const startTime = new Date().getTime();
//         //没有要执行的函数？，但仍会执行循环
//         while (new Date().getTime()<startTime + milliSeconds);
//     }
//     sleep(10000);
//     return "Hello Start";
// }

// function upload() {
//     console.log("Request handler 'upload' was called.");
//     return "Hello Upload";
// }


// @@处理函数--返回对应的内容,返回给路由，再由路由返回给服务器，再展示到页面上
// @@新的问题：因为callback是异步的，return content是同步的，没办法预期返回想要返回的content
// @@解决方案：应该让router模块来处理返回的值，而不是在server模块直接写


// let exec = require("child_process").exec;

// function start() {
//     console.log("Request handler 'start' was called.");
//     let content = 'empty';
//     exec("ls -lah",function(error,stdout,stderr){//这里的shell命令是需要一定时间的，相当于前面的sleep()
//         // console.log(stdout);
//         content = stdout;//这步是啥意思？-将值赋给conten用于后面的展示
//         console.log("stdout:"+stdout);
//         // return content;//return 放在这也不行，因为router.js中要将这个返回给server模块
//     });
//     // console.log("content:"+content);

//     return content;//return 放在这会立即执行，不会等你的回调,虽然后面回调还是会执行
// }

// function upload() {
//     console.log("Request handler 'upload' was called.");
//     return "Hello Upload";
// }

// @@处理函数--返回对应的内容,返回给路由，再由路由返回给服务器，再展示到页面上
// @@新的问题：因为callback是异步的，return content是同步的，没办法预期返回想要返回的content
// @@解决方案：应该让router模块来处理返回的值，而不是在server模块直接写


// let exec = require("child_process").exec;

// function start(response) {
//     console.log("Request handler 'start' was called.");
//     exec("ls -lah",function(error,stdout,stderr){//这里的shell命令是需要一定时间的，相当于前面的sleep()
//         response.writeHead(200,{"Content-Type": "text/plain"});
//         response.write(stdout);
//         response.end();
//     });
// }

// function upload(response) {
//     console.log("Request handler 'upload' was called.");
//     response.writeHead(200,{"Content-Type": "text/plain"});
//     response.write("Hello upload");
//     response.end();
// }

// @@为了更明显感觉到非阻塞
// @@但我发现 find /这个操作是个无效的命令，不知道为啥
// let exec = require("child_process").exec;

// function start(response) {
//     console.log("Request handler 'start' was called.");
//     exec("find /", {//find /这个命令无效啊？
//         timeout: 10000, maxBuffer: 20000 * 1024//maxBuffer允许的最大字节数
//     }, function (error, stdout, stderr) {//延迟十秒
//         console.log(stdout);
//         response.writeHead(200, { "Content-Type": "text/plain" });
//         response.write(stdout);
//         response.end();
//     });
// }

// function upload(response) {
//     console.log("Request handler 'upload' was called.");
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.write("Hello upload");
//     response.end();
// }


// @@处理函数--返回对应的内容,返回给路由，再由路由返回给服务器，再展示到页面上
// @@处理post请求
// @@用node.js写页面的方法
// @@引入querystring模块，只传text字段

// const querystring = require("querystring");

// function start(response) {
//     console.log("Request handler 'start' was called.");
//     let body = '<html>' +
//         '<head>' +
//         '<meta http-equiv="Content-Type" content="text/html ' +
//         'charset=UTF-8" />' +
//         '</head>' +
//         '<body>' +
//         '<form action="/upload" method="post">' +
//         '<textarea name="text" rows="20" cols="60"></textarea>' +
//         '<input type="submit" value="Submit text" />' +
//         '</form>' +
//         '</body>' +
//         '</html>';
//     response.writeHead(200, { "Content-Type": "text/html" });//这边要指定Content-Type
//     response.write(body);
//     response.end();
// }

// function upload(response, postData) {
//     console.log("Request handler 'upload' was called.");
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     // response.write("Hello upload");
//     // response.write("You've sent: " + postData);//对postData进行处理,传的格式为 "text=xxxxx"
//     response.write("You've sent the text: " + querystring.parse(postData).text);//对postData进行处理,传的格式为 "xxxxx"
//     response.end();
// }

// exports.start = start;
// exports.upload = upload;


// @@
// @@在/start表单中添加一个文件上传元素
// @@将node-formidable整合到我们的upload请求处理程序中，用于将上传的图片保存到/tmp/test.png
// @@引进fs模块将保存在本地的文件在浏览器中显示,将上传的图片内嵌到/uploadURL输出的HTML中

const querystring = require("querystring");
const fs = require("fs");
const formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");
    let body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +//添加一个multipart/form-data的编码类型
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, { "Content-Type": "text/html" });//这边要指定Content-Type
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    let form = new formidable.IncomingForm();
    form.uploadDir='./tmp';// 写一个临时路径,不写会报错
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "./tmp/test.png");//该方法是同步执行的,确保该文件保存成/tmp/test.png
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("received image:<br/>");
        response.write("<img style='width: 200px;height:200px;' src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;