const {
  spawn
} = require('child_process');

// 'wc' command calculate line/word/character
const child = spawn('wc');

process.stdin.pipe(child.stdin);

child.stdout.on('data', (data)=>{
  console.log(`child stdout:\n${data}`);
  
})