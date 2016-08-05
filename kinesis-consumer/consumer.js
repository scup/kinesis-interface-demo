var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/logger') {
    res.statusCode = 404;
    return res.end();
  }

  console.log('Consumer: reading data...');

  var message = '';

  req.on('data', function (chunk) {
    message += chunk.toString();
  });

  req.on('end', function () {
    try {
      var parsedMessage = JSON.parse(message);
      console.log(parsedMessage.length + ' kinesis records received');

      res.statusCode = 200;
      res.end();
    } catch (error) {
      console.log('Error reading Kinesis data !!! Error: ' + JSON.stringify(error));

      res.statusCode = 500;
      res.end();
    }
  });
});

server.listen(80, function () {
  console.log('Consumer: started server');
});
