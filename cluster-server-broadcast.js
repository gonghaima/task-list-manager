const cluster = require('cluster');
const os = require('os');

// *** Mock DB Call

const numberOfUsersInDB = function () {
  this.count = this.count || 5;
  this.count = this.count * this.count;
  return this.count;
}

// ***

if (cluster.isMaster) {
  // get the total number of cpus.
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  

  // create same amount of worker as per cpu
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  /** Broadcase to child processes */
  // Object.values(cluster.workers).forEach(worker => {
  //   worker.send(`Hello worker ${worker.id}`);
  // });

  const updateWorkers = () =>{
    const usersCount = numberOfUsersInDB();
    Object.values(cluster.workers).forEach(worker => {
      worker.send({usersCount});
    });
  };

  updateWorkers();
  setInterval(updateWorkers, 10000);
} else {
  require('./cluster-less-server');
}