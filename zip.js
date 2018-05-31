const {
  Transform
} = require('stream');

const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];
const crypto = require('crypto');

// fs.createReadStream(file)
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream(file + '.gz'));

/** tasks can be chained together as below */
// fs.createReadStream(file)
//   .pipe(zlib.createGzip())
//   .on('data', () => process.stdout.write('.'))
//   .pipe(fs.createWriteStream(file + '.gz'))
//   .on('finish', () => console.log('Done'))


/** create a transport stream to report the procdess */
// const progress = new Transform({
//   transform(chunk, encoding, callback) {
//     process.stdout.write('.');
//     callback(null, chunk);
//   }
// });
// fs.createReadStream(file)
//   .pipe(zlib.createGzip())
//   // .on('data', () => process.stdout.write('.'))
//   .pipe(progress)
//   .pipe(fs.createWriteStream(file + '.gz'))
//   .on('finish', () => console.log('Done'))

/** add crypto */
const progress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});
fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher('aes192', 'a_secret'))
  .pipe(progress)
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'))