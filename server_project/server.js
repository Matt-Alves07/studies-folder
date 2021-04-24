var http = require('http')
var fs = require('fs')

function serverStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type':'text/plain' });
            res.end('500 - Erro Interno');
        } else {
            res.writeHead(responseCode, { 'Content-Type':contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req,res) {
    res.writeHead(200, { 'Content-Type' : 'text/html' });
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            serverStaticFile(res, '/home.html', 'text/html');
            break;
        case '/sobre':
            serverStaticFile(res, '/html/sobre.html', 'text/html');
            break;
        case '/imgs':
            serverStaticFile(res, '/imgs/its-me.jpg', 'image/jpg');
            break;
        case '/its-me.jpg':
            serverStaticFile(res, '/imgs/its-me.jpg', 'image/jpg');
            break;
        case '/imgs/its-me.jpg':
            serverStaticFile(res, '/imgs/its-me.jpg', 'image/jpg');
            break;
        default:
            serverStaticFile(res, '/html/404.html', 'text/html');
            break;
    }
}).listen(3000);

console.log('Servidor iniciando;\nPressione Ctrl+C para encerrar.')