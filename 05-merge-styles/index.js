const fs = require('fs');
const path = require('path');

let arr = [];

// Intitializing the readFileLines with filename
fs.readdir(path.join(__dirname, 'styles'), (err, items) => {
  if (err) console.error(message.error);

  
  for (let i = 0; i < items.length; i++) {
    let file = path.join(__dirname, 'styles') + '/' + items[i];
      if (path.extname(file) === '.css') {
        
        fs.readFile(file, (err, data) => {
          if(err) throw err;
          arr.push(data.toString());

          // fs.appendFile(
          // path.join(__dirname, 'project-dist', 'bundle.css'),
          // data.toString(),
          // err => {
          //     if (err) throw err;
          // }
          // );

          let bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
          bundle.on('error', function(err) { /* error handling */ });
          arr.forEach(item => {
            bundle.write(item)
          })
          bundle.end();
        });
      }
  }
});
