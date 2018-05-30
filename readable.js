const {
  Readable
} = require('stream');

/** simple but not efficient, 
 * we push all the data to the stream,
 * before pipe into the processing stdout */
// const inStream = new Readable();
// inStream.push('ABCDEFGH');
// inStream.push(null);
// inStream.pipe(process.stdout);

/** Better way is to push data on demand,
 * when consumer ask for it */
// const inStream = new Readable({
//   read(size){
//     this.push(String.fromCharCode(this.currentCharCode++));
//     //push null to stop the process
//     if(this.currentCharCode>90) this.push(null);
//   }
// });
// inStream.currentCharCode = 65;


const inStream = new Readable({
  read(size) {
    setTimeout(() => {
      //push null to stop the process
      if (this.currentCharCode > 90){
        this.push(null);
        return;
      }
      this.push(String.fromCharCode(this.currentCharCode++));
    }, 100);
  }
});

inStream.currentCharCode = 65;

inStream.pipe(process.stdout);

/** register on exit event */
process.on('exit', ()=>{
  console.error(
    `\n\ncurrentCharCode is ${inStream.currentCharCode}`
  );
});

/** register on exit event */
process.stdout.on('error', process.exit);