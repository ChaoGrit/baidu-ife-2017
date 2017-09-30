let server = require('./server');
let router = require('./router');
server.start(router.route);