const fs = require('fs');
const EventEmitter = require('events');

class WithLog extends EventEmitter{
  execute(asyncFunc, ...args){
    console.time('execute');
    this.emit('begin');
    asyncFunc(...args, (err,data)=>{
      if(err){
        return this.emit('error', err);
      }
      
      this.emit('data', data);

      console.timeEnd('execute');
      this.emit('end');
    });
  }
}

const withLog = new WithLog();

withLog.on('begin',()=>console.log('About to execute'));
withLog.on('end',()=>console.log('Done with execute'));

withLog.execute(fs.readFile,__filename);