let fs = require('fs');
let stream = new fs.ReadStream( __dirname +'/text.txt', {encoding: 'utf8'});

stream.on('readable', () => {
  console.log(stream.read());
});

stream.on('end', () => {
  console.log('');
});