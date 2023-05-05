const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

fs.writeFile(`${path.dirname(__filename)}/file.txt`, '', err => {
  if (err) return;
  console.log('write something');
});

function enterMessage () {
  const regExp = new RegExp('exit');
  let rl = readline.createInterface({ input, output });
  function question (){
  rl.question('', (answer) => {
    if (answer.match(regExp)) {
      console.log('thank you');
      rl.close();
      return
    }
    fs.appendFile(`${path.dirname(__filename)}/file.txt`, answer, err => {
      if (err) throw err});
    question();
  });

 }
 question();
} 
enterMessage();