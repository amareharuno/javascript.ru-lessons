let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    let info;

    // Async call
    if (req.url === "/") {
        fs.readFile("index.html", (err, info) => { // callback
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("Internal Server Error");
                return;
            }
            res.end(info);
        });
    } else {
        // 404
    }
}).listen(3000);
