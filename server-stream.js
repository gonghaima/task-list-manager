const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res)=>{
  /* consume large server machine memory */
  // fs.readFile('./big.file', (err, data)=>{
  //   if(err) throw err;
  //   res.end(data);
  // });

  /** use stream to avoid filling up memory, 
   * the server memory usage remain low & consistent */
  const src = fs.createReadStream('./big.file', (err, data));
  src.pipe(res);
});

server.listen(8000);