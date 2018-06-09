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

  cluster.on('exit', (worker, code, signal) => {
    /** condition: if it is really crashed, 
     * rather than manually disconnected or killed by master process.
     * for example, master process may decide there are too many resourced being used,
     * according to load balancer exceed
     * and close a few using .kill or .disconnect method.
     * In that case, exitedAfterDisconnect will be true*/
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. ` +
        'Starting a new worker...');
      cluster.fork();
    }
  });
} else {
  require('./server-random-broken');
}