let http = require('http');

let server = new http.Server();
// http.Server() -> net.Server() -> EventEmitter
server.listen(1337, '127.0.0.1');

let counter = 0;

let emit = server.emit;
server.emit = function(event /*, arg1, arg2,... */) {
  console.log(event);
  emit.apply(server, arguments);
};

server.on('request', (req, res) => {
    res.end("Hello world!" + ++counter);
});