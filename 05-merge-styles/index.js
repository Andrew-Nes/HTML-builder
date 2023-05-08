const fs = require('fs');
const path = require('path');
let arrOfStyles = [];
const dir = `${path.dirname(__filename)}/styles/`;

fs.readdir(dir, (err, files )=> {if (err) throw err;
  const fileList = files.filter(element => element.includes('.css'));
  for (const file of fileList) {
    fs.readFile(dir + `${file}`, (err, data) => {
      if(err) throw err;
      arrOfStyles.push(data);
      if (arrOfStyles.length === fileList.length) {
        fs.writeFile(`${path.dirname(__filename)}/project-dist/bundle.css`, arrOfStyles.join(''), (err) => {
          if (err) throw err;}
        );
      }
    });
  }
});