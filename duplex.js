const {Duplex} = require('stream');

const inoutSteam = new Duplex({
  write(chunk, encoding, callback){
    console.log(chunck.toString());
    callback();
  }, 
  read(size){
    if(this.currentCharCode > 90){
      this.push(null);
      return;
    }
    this.push(String.fromCharCode(this.currentCharCode++))
  }
});

inoutSteam.currentCharCode = 65;
process.stdin.pipe(inoutSteam).pipe(process.stdout);