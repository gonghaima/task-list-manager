// const http = require('http');

// // if just get info, use http.get instead.
// const req = http.get({
//     hostname: 'www.google.com'
//   },
//   (res) => {
//     console.log(res.statusCode);
//     console.log(res.headers);

//     res.on('data', (data)=>{
//       console.log(data.toString());
//     });
//   }
// );

// req.on('error', (e)=>console.log(e));

// req.end();

const https = require('https');

// if just get info, use http.get instead.
const req = https.get(
  'https://www.google.com',
  (res) => {
    // res: http.IncommingMessage
    console.log(res.statusCode);
    console.log(res.headers);

    res.on('data', (data)=>{
      console.log(data.toString());
    });
  }
);

req.on('error', (e)=>console.log(e));

console.log(req.agent); // http.Agent
