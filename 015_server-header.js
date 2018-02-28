// http://127.0.0.1:1337/echo?message=Hello -> Hello
let http = require('http');
let url = require('url');

let server = http.createServer((req, res) => {
   console.log(req.headers);

    let parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/echo' && parsedUrl.query.message) {
        // не ждет ближайшей передачи данных, сразу отправляет заголовки
        res.writeHead(200, "OK", {'Cache-control': 'no-cache'});

        // отправляет заголовки при ближайшей передаче данных
        // res.setHeader('Cache-control', 'no-cache'); // removeHeader

        res.statusCode = 200; // OK
        res.end(parsedUrl.query.message);
    } else {
        res.statusCode = 404; // Not Found
        res.end("Page not found");
    }
}).listen(1337, '127.0.0.1');

console.log("Server running at http://127.0.0.1:1337/");