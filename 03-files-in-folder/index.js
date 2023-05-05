const fs = require('fs');
const path = require('path');
const dir = `${path.dirname(__filename)}/secret-folder/`;

fs.readdir(dir, {withFileTypes: true}, (err, files) => {
  if(err) throw err;
  for (const file of files) {
    const extention = path.parse(`${dir}/${file.name}`).ext.slice(1);
    const name = path.parse(`${dir}/${file.name}`).name;
    fs.stat(`${dir}/${file.name}`, function(err, stats) {
      if (err) return err;
      if (file.isFile() === true){
        console.log(`${name} - ${extention} - ${ Math.round((stats.size / 1024)*1000)/1000}kb`);
      }
    });
  }
});
