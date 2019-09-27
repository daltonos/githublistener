var http = require('http');
//create a server object:
http.createServer(function (request, res) {
   res.writeHead(200, { 'Content-Type': 'text/html' }); // http header
   var url = request.url;
   if (url === '/about') {
      res.write('<h1>about us page<h1>'); //write a response
      res.end(); //end the response
   } else if (url === '/notify_pull_request_merge') {
      var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = JSON.parse(body);
            res.write('<div>' + body + '<div>'); //write a response
            console.log(post);
            res.end(); //end the response
        });
   }
}).listen(3000, function () {
   console.log("server start at port 3000"); //the server object listens on port 3000
});