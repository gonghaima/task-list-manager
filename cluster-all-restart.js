const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // get the total number of cpus.
  const cpus = os.cpus().length;

  // create same amount of worker as per cpu
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  console.log(`Master PID: ${process.pid}`);
  

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
// can be trigger via command    kill -SIGUSR2 PID
  process.on('SIGUSR2', ()=>{
    // get all current workers
    const workers = Object.values(cluster.workers);

    const restartWorker = (workerIndex) =>{
      const worker = workers[workerIndex];
      if(!worker) return;
      worker.on('exit', ()=>{
        if(!worker.exitedAfterDisconnect) return;
        console.log(`Exited process ${worker.process.pid}`);
        cluster.fork().on('listening', ()=>{
          restartWorker(workerIndex+1);
        });
      });
      worker.disconnect();
    };

    restartWorker(0);
  });
} else {
  require('./cluster-less-server');
}