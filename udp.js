const dgram = require('dgram');
const PORT = 3333;
const HOST = '127.0.0.1';

//Server
const server = dgram.createSocket('udp4');

server.on('listening', () => console.log('UDP Server listening'));

server.on('message', (msg, rinfo) => {
  console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);

});

server.bind(PORT, HOST);

//Client

const client = dgram.createSocket('udp4');
client.send('Pluralsight rocks', PORT, HOST, (err) => {
  if (err) throw err;

  console.log('UDP message sent');
  client.close();
});

// setInterval(() => {
//   const client = dgram.createSocket('udp4');
//   client.send('Pluralsight rocks', PORT, HOST, (err) => {
//     if (err) throw err;

//     console.log('UDP message sent');
//     client.close();
//   });
// }, 1000);

/* msg can be buffer instead of string, then additional parameter for, buffer start, buffer end*/
// const client = dgram.createSocket('udp4');
// const msg = Buffer.from('Pluralsight rocks');
// client.send(msg, 0, msg.length, PORT, HOST, (err) => {
//   if (err) throw err;

//   console.log('UDP message sent');
//   client.close();
// });

// const client = dgram.createSocket('udp4');
// const msg = Buffer.from('Pluralsight rocks');
// client.send(msg, 0, 11, PORT, HOST, (err) => {
//   if (err) throw err;
//   client.send(msg, 11, 6, PORT, HOST, (err) => {
//     if (err) throw err;
//     console.log('UDP message sent');
//     client.close();
//   });
// });   

/*can be array of messages*/
// const client = dgram.createSocket('udp4');
// const msg = Buffer.from('Pluralsight rocks');
// client.send([], 0, 11, PORT, HOST, (err) => {
//   if (err) throw err;
//   client.send(msg, 11, 6, PORT, HOST, (err) => {
//     if (err) throw err;
//     console.log('UDP message sent');
//     client.close();
//   });
// });   