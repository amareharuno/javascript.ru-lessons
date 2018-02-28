let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    let info;

    // Sync call
    if (req.url === "/") {
        try {
            info = fs.readFile("index.html");
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end("Internal Server Error");
        }
    } else {
        // 404
    }

}).listen(3000);
