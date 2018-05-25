const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  });
  // .end terminate the message, has to close the node process, otherwise timeout - default 2min
  // res.end('Hello world\n');

  // .write keep streaming
  res.write('Hello world\n');

  setTimeout(() => {
    res.write('Another Hello world\n');
  }, 1000);

  setTimeout(() => {
    res.write('Yet Another Hello world\n');
  }, 2000);
});

// manually set time out period
// server.timeout = 1000;

server.listen(8000);