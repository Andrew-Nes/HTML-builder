const fs = require('fs');
const path = require('path');

function copyFiles() {
  fs.readdir(path.dirname(__filename) + '/files/', (err, files) => {
    if (err) throw err;
    for  (const file of files) {
      fs.readFile(path.dirname(__filename) + '/files/' + `${file}`, (err, data) => { 
        if (err) throw err;
        fs.writeFile(path.dirname(__filename) + '/files-copy/' + `${file}`, data, (err) => {
          if(err) throw err;
        });
      });

    }
  });
}

function copyDir (){
  fs.mkdir(path.dirname(__filename) + '/files-copy', (err) => {
    if(err) {
      fs.readdir(path.dirname(__filename) + '/files-copy', (err, files) => {if (err) throw err;
        for  (const file of files){
          fs.unlink(path.dirname(__filename) + '/files-copy'+ `/${file}`, (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
  copyFiles();
}
copyDir();
