const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 8080;

const requestHandler = (req, res) => {
    fileApend(req);
    console.log(filename);
    console.log(req.url);
    console.log(undefined);
    var q = url.parse(req.url, true);
    var filetype;
    var filename;
    function fileApend (req, err) {
        var q = url.parse(req.url, true);
        if (err) throw (err);
        if (req.url.indexOf('.') != -1) {
            filetype = q.pathname.slice(q.pathname.indexOf('.',0)+1,q.pathname.length);
            filename = q.pathname.slice(1,q.pathname.length);
        } else {
            filename = q.pathname.slice(1,q.pathname.length) + '.html';
            filetype = 'html';
        }
    if (req.url == '/') {
        console.log('do i even get here');
        fs.readFile('home', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
          console.log(err);
          return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })}
    else{
    console.log('does the if trigger?');
    fs.readFile(filename, function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/' + filetype});
          return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/' + filetype});
        res.write(data);
        return res.end();
    })}
}};
const server = http.createServer(requestHandler);
server.listen(port);