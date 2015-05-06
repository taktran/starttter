"use strict";

var nodeStatic = require('node-static');

var file = new(nodeStatic.Server)('./app/public');
var port = process.env.PORT || 8080;

console.log("Starting server at: http://localhost:" + port);

require('http').createServer(function(request, response) {
  file.serve(request, response, function(err, res) {
    if (err) {
      response.writeHead(err.status, err.headers);
      response.end();
    }
  });
}).listen(port);