const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit} = process;

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
      if (err) throw err;
  }
);
stdout.write('Hello! Enter text:\n> ');

process.on('exit', () => stdout.write('Good luck!'));

// Begin reading from stdin so the process does not exit.
stdin.resume();

stdin.on("data", function(data) {
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data.toString(),
    err => {
        if (err) throw err;
    }
  );
  let arr = data.toString().trim().split(' ');
  for (key in arr) {
    if (data.toString().trim() == 'exit' || 
        arr[key] === 'exit' ||
        arr[key].includes('exit')) {
      exit();
    }
  }
  
})

// Using a single function to handle multiple signals
function handle(signal) {
  exit();
}

process.on('SIGINT', handle);
