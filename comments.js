// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var filename = path.join(__dirname, pathname);
    fs.exists(filename, function(exists) {
        if (!exists) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('404 Not Found\n');
            res.end();
            return;
        }
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.write(err + '\n');
                res.end();
                return;
            }
            res.writeHead(200);
            res.write(data);
            res.end();
        });
    });
});
server.listen(8000);
console.log('Server running at http://):8000/');