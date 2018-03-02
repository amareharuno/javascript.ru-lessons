let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

let ROOT = __dirname + "/public/";
http.createServer((res, req) => {
    if (!checkAccess(req)) {
        res.statusCode = 403;
        res.end("Tell me the secret to access!");
        return;
    }

    sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAccess(req) {7
    return url.parse(req.url, true).query.computeSecret === 'o_0'
}

function sendFileSafe(filePath, res) {
    try {
        filePath = decodeURIComponent(filePath); // Декодирует, например коды кирриллицы, типо %D1%8F
    } catch (e) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }

    if (~filePath.indexOf('\0')) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }

    // /deep/nodejs.jpg -> __dirname + "/public/deep/nodejs.jpg"
    filePath = path.normalize(path.join(ROOT, filePath)); // normalize удаляет из пути ненужные символы (., .., и т.п.)

    if (!filePath.includes(ROOT)) {
        res.statusCode = 404;
        res.end("File nod found");
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end("File nod found");
            return;
        }

        sendFile(filePath, res);
    })
}

function sendFile(filePath, res) {
    fs.readFile(filePath, (err, content) => {
        if (err) throw err;

        let mime = require('mime').lookup(filePath);
        res.setHeader('Content-Type', mime + "; charset=utf-8");
        res.end(content);
    })
}