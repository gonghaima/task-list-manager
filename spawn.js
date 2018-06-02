const {
  spawn
} = require('child_process');

// run 'pwd' command in a child process
// const child = spawn('pwd');

// pass options as second paramter, as below, equivalant to 'find . -type f' in command
// const child = spawn('find', ['.', '-type', 'f']);

// trigger stderr, when invalid argument passed in.
const child = spawn('dsfds', ['.', '-type', 'f']);
child.on('error', (code, signal) => {
  console.log(`child process error with code ${code}, signal ${signal}`);
});


child.stdout.on('data', (data)=>{
  console.log(`child stdout:\n${data}`);
});

child.stderr.on('data', (data)=>{
  console.log(`child stderr:\n${data}`);
});

child.on('exit', (code, signal) => {
  console.log(`child process exited with code ${code}, signal ${signal}`);
});


// other events on child: disconnect, error, message, close
//(close is different from exit. When child process exit, it does not mean the stream get closed.)

// all stream are event emmiter, we can listen to the different event
// stdio objects: child.stdin, child.stdout, child.stderr

