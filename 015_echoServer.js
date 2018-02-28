// http://127.0.0.1:1337/echo?message=Hello -> Hello
let http = require('http');
let url = require('url');

let server = http.createServer((req, res) => {
   console.log(req.method, req.url);

   let parsedUrl = url.parse(req.url, true);
   console.log(parsedUrl);

   if (parsedUrl.pathname === '/echo' && parsedUrl.query.message) {
       res.end(parsedUrl.query.message);
   } else {
       res.statusCode = 404;
       res.end("Page not found");
   }
}).listen(1337, '127.0.0.1');

console.log("Server running at http://127.0.0.1:1337/");