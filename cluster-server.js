const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // get the total number of cpus.
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  

  // create same amount of worker as per cpu
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  require('./cluster-less-server');
}