const { spawn } = require('child_process');

const child = spawn('node', ['timer.js'], {
  detached: true,
  // parent can exit independently 
  stdin: 'ignore'
});

// when child.unref() called, the parent process can exit independently. 
// It is useful when child process is in a long running process.
child.unref();



