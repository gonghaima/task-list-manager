const fs = require('fs');
const server = require('http').createServer();
const data = {id:'343223', name: 'Jessica'};

server.on('request', (req, res) => {
  // console.log(req.url);
  
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(`request body: ${body}`);
  });
  switch (req.url) {
    case '/api':
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(data));
      break;
    case '/home':
    case '/about':
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(fs.readFileSync(`.${req.url}.html`));
      break;
    case '/':
      res.writeHead(301, {
        'Location': '/home'
      });
      res.end();
      break;
    default:
      res.writeHead(404);
      res.end();
      break;
  }
});

server.listen(8000);
