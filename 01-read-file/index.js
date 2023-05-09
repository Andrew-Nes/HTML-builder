let fs = require('fs');
let stream = new fs.ReadStream( __dirname +'/text.txt', {encoding: 'utf8'});

stream.on('readable', () => {
  const text = stream.read();
  if (text !== null) {console.log(text)};
});

stream.on('end', () => {
   console.log('');
});