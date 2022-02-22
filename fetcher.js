const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let url = process.argv[2];
let location = process.argv[3];

request(`${url}`, (error, response, body) => {
  rl.question(`If ${location} already exists, it will be overwritten. If you would like to proceed, type 'y' + enter. If you would like to exit, type 'no' + enter. `, (answer) => {
    if (answer === 'y') {
      fs.writeFile(`${location}`, body, function(err) {
        if (err) throw err;
        console.log(`Downloaded and saved ${body.length} bytes to ${location}`);
        rl.close();
      });
    } else {
      rl.close();
    }
  });
});

