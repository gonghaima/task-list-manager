/** unlike others implementing read and write, Transform stream only need implement Transform method which combine both of them (read/write) */

const {Transform} = require('stream');

const upperCaseTr = Transform({
  transform(chunk, encoding, callback){
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);