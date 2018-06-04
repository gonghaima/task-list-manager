// const {exec} = require('child_process');

// exec('find . -type f | wc -l', (err, stdout, stderr)=>{
//   if(err){
//     console.error(`exec error: ${err}`);
//     return;
//   }
//   console.log(`Number of files ${stdout}`);
// });    

/** if use spawn() */
// const { spawn } = require('child_process');
// const child = spawn('find', ['.', '-type', 'f'], {
//   stdio: 'inherit'
// })

/** if use spawn() -  shell mode */
// const { spawn } = require('child_process');
// const child = spawn('find', ['.', '-type', 'f'], {
//   stdio: 'inherit',
//   shell: true
// })

/** Different cwd */
// const { spawn } = require('child_process');
// const child = spawn('find . -type f | wc -l', {
//   stdio: 'inherit',
//   shell: true,
//   cwd: '/Users'
// })

/** Env */
const { spawn } = require('child_process');
const child = spawn('echo $ANSWER', {
  stdio: 'inherit',
  shell: true,
  env: {ANSWER: 42}
})
