const {
  spawn
} = require('child_process');

const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

// the result of the first process 'find' - find all files
// as input of second process 'wc' - calculate lines
find.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data)=>{
  console.log(`Number of files ${data}`);
  
})