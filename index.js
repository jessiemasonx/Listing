var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.png': 'image/png'
}

http.createServer(onrequest).listen(8000)

function onrequest(req, res) {
  var route = req.url
  if (route === '/') {
    route = 'index.html'
      console.log("Request for index.html");
  }

  fs.readFile(path.join('static', route), onread)

  function onread(err, buf) {
    if (err) {
         res.statusCode = 404;
          console.log("Request for unvalid page");
           fs.createReadStream("./static/nonexistent-file.html").pipe(res);


      }

      else {
      res.statusCode = 200
      var extension = path.extname(route)
      var type = mime[extension] || 'text/plain'
      res.setHeader('Content-Type', type)
      res.end(buf)
    }
  }
}
