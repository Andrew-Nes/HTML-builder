const fs = require('fs');
const path = require('path');
let arrOfComponents = [];
let arrOfStyles = [];
const dir = `${path.dirname(__filename)}/styles/`;


function copyDir (){
  fs.mkdir(path.dirname(__filename) + '/project-dist', (err) => {
    if(err) {
      fs.rm(path.dirname(__filename) + '/project-dist' + '/assets', { recursive: true }, (err) => {
        if(err) throw err;
        copyFiles();
      });
      fs.readdir(path.dirname(__filename) + '/project-dist',{withFileTypes:true}, (err, files) => {if (err) throw err;
        for  (const file of files){
          if (file.isFile() === true) {fs.unlink(path.dirname(__filename) + '/project-dist'+ `/${file.name}`, (err) => {
            if (err) throw err;
          });
          }
        }
      });
    }
    if (!err) {copyFiles();}
  });
}

function copyFiles() {
  fs.mkdir(path.dirname(__filename) + '/project-dist' + '/assets', (err) => {
    if(err) throw err;
  });
  fs.readdir(path.dirname(__filename) + '/assets', (err, directories) => {if (err) throw err;
    for (const directory of directories) {
      fs.mkdir(path.dirname(__filename) + '/project-dist/' + '/assets/' + `${directory}`, (err) => {
        if(err) throw err;
      });
      fs.readdir(path.dirname(__filename) + '/assets/' + `${directory}`, (err, files) => {
        if (err) throw err;
        for  (const file of files) {
          fs.readFile(path.dirname(__filename) + '/assets/' + `${directory}/` + `${file}`, (err, data) => { 
            if (err) throw err;
            fs.writeFile(path.dirname(__filename) + '/project-dist/' + '/assets/' + `${directory}/` + `${file}`, data, (err) => {
              if(err) throw err;
            });
          });
        }
      });
    }});
}
copyDir();


fs.readdir(dir, (err, files )=> {if (err) throw err;
  const fileList = files.filter(element => element.includes('.css'));
  for (const file of fileList) {
    fs.readFile(dir + `${file}`, (err, data) => {
      if(err) throw err;
      arrOfStyles.push(data);
      if (arrOfStyles.length === fileList.length) {
        fs.writeFile(`${path.dirname(__filename)}/project-dist/style.css`, arrOfStyles.join(''), (err) => {
          if (err) throw err;}
        );
      }
    });
  }
});

function collectHtml () {
  let templ;
  let arrOfComponentNames = [];
  fs.readFile(__dirname + '/template.html', (err, data) => {
    if(err) throw err;
    templ = data.toString();
  });
  fs.readdir(__dirname + '/components', (err, files) => {
    if(err) throw err;
    for (const file of files) {
      if (file.slice((file.length - 5) === '.html')) {
        fs.readFile(__dirname + '/components/' + `${file}`, (err, data) => {
          if (err) throw err;
          arrOfComponents.push(data.toString());
          let componentName = file.slice(0, (file.length - 5));
          arrOfComponentNames.push(componentName);
          templ = templ.replace(`{{${componentName}}}`, `${arrOfComponents[arrOfComponentNames.indexOf(componentName)]}`);
          fs.writeFile(__dirname + '/project-dist/index.html', templ , err => {if (err) throw err;
          });
        });
      }
    }  
  });
}
collectHtml ();