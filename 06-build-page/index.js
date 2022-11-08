const fs = require('fs');
const path = require('path');
const promises = fs.promises;
const copyFile = promises.copyFile;

const pathDir = path.join(__dirname, 'project-dist');
const pathSrc = path.join(__dirname, 'assets');
let arrHtml = '';
let arrCss = '';

fs.rm(pathDir, { recursive:true, force: true }, (err) => {
  if (err) {
    // File deletion failed
    console.error(err.message);
    return;
  }

  fs.readdir(path.join(__dirname, 'styles'), (err, items) => {
    if (err) console.error(message.error);
  
    items.forEach(item => {
      let file = path.join(__dirname, 'styles') + '/' + item;
      if (path.extname(file) === '.css') {
        
        fs.readFile(file, (err, data) => {
          if(err) throw err;
          arrCss = arrCss + data.toString() + '\n';
          //arr.push(data.toString() + '\n');

          let bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
          bundle.on('error', function(err) { /* error handling */ });
          // arr.forEach(item => {
          //   bundle.write(item)
          // })
          bundle.write(arrCss);
          bundle.end();
        })
      }
    });

  fs.mkdir(pathDir,{ recursive: true }, (err) => {
    if (err) {
      throw new Error('Directory was there');
    }
  
      promises
      .readdir(pathSrc)
      .then(files => {
        files.forEach(file => {
          let fileSrc = path.join(pathSrc, file);
          let folderName = path.basename(fileSrc);
      
          fs.mkdir(path.join(pathDir, 'assets', folderName),{ recursive: true }, (err) => {
            if (err) {
              throw new Error('Directory was there');
            }

            fs.readdir(path.join(pathSrc, folderName), (err, items) => {
              if (err) console.error(message.error);

              items.forEach(file => {
                let fileSrc = path.join(pathSrc, folderName, file);
                copyFile(fileSrc, path.join(pathDir, 'assets', folderName, file));
                //console.log(fileSrc);
              });
                
                fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
                  if(err) throw err;
              
                  arrHtml = data.toString();
              
                  fs.readdir(path.join(__dirname, 'components'), (err, data) => {
                    if(err) throw err;
              
                    data.forEach(item => {
                      let file = path.join(__dirname, 'components') + '/' + item;
                      if (path.extname(file) === '.html') {
                        let fileName = item.replace(path.extname(item), '');
                        fs.readFile(file, (err, data) => {
                          if(err) throw err;
            
                          if (arrHtml.includes(`{{${fileName}}}`)) {
                            arrHtml = arrHtml.replace(`{{${fileName}}}`, data.toString());
                          }
            
                          (() => {
                            let index = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
                            index.on('error', function(err) { /* error handling */ });
                            index.write(arrHtml)
                            index.end();
                          })();
                        }); 
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
  });
  console.log('The project was built. Thank you for your patience :)');
});
console.log('Please wait a few seconds...');




