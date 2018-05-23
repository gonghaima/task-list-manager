const dns = require('dns');

// dns.lookup('pluralsight.com', (err, address)=>{
//   console.log(address);
// });

// dns.resolve4('pluralsight.com', (err, address)=>{
//   console.log(address);
// });

// dns.resolve('pluralsight.com', 'A', (err, address)=>{
//   console.log(address);
// });

// dns.resolve('pluralsight.com', 'MX', (err, address)=>{
//   console.log(address);
// });

// dns.resolveMx('pluralsight.com', (err, address)=>{
//   console.log(address);
// });

dns.reverse('35.161.75.227', (err, hostnames)=>{
  console.log(hostnames);
});