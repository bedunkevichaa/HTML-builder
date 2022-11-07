const fs = require('fs');
const promises = fs.promises;
const copyFile = promises.copyFile;
const path = require('path');

const pathDir = path.join(__dirname, 'files-copy');
const pathSrc = path.join(__dirname, 'files');

(function copyFolder() {

  fs.rm(pathDir, { recursive:true, force: true }, (err) => {
    if (err) {
      // File deletion failed
      console.error(err.message);
      return;
    }
    //console.log("File deleted successfully");
    
    fs.mkdir(pathDir,{ recursive: true }, (err) => {
      if (err) {
        throw new Error('Directory was there');
      }

      console.log('Directory created successfully!');
      
      promises
      .readdir(pathSrc)
      .then(files => {
        files.forEach(file => {
          let fileSrc = path.join(pathSrc, file);
          //delFile(file, { recursive:true });
          copyFile(fileSrc, path.join(pathDir, file));
        });
      });

      console.log('files copied.');
    });
  });
})();




// const makeFolder = () => {
//   fs.access(pathDir, error => {
//     if (error) {
//       fs.mkdir(pathDir,
//         { recursive: true }, (err) => {
//         if (err) {
//           return;
//         }
//         //console.log('Directory created successfully!');
//       });
//     }
//   });
// }

// const deleteFiles = () => {
//   fs.access(pathDir, error => {
//     if (!error) {
//       fs.readdir(pathDir, function(err, items) {
//         if (err) return;
      
//         for (let i = 0; i < items.length; i++) {
//           let file = pathDir + '/' + items[i];
        
//           fs.rm(file, { recursive:true }, (err) => {
//             if(err){
//                 // File deletion failed
//                 console.error(err.message);
//                 return;
//             }
//             console.log("File deleted successfully");
             
//           })
//         }
//       });
//     }
//   });
// }

// const copyFiles = () => {
//   fs.readdir(pathSrc, function(err, items) {
//     if (err) return;

//     for (let i = 0; i < items.length; i++) {
//       let file = pathSrc + '/' + items[i];
//       let fileEnd = pathDir + '/' + items[i];
      
//       fs.copyFile(file, fileEnd, err =>{
//         if (err) return;

//         //console.log('Files copyed');
//       });
//     }
//   });
// }

// emitter.on('first', makeFolder);
// emitter.on('first', deleteFiles);
// emitter.on('first', copyFiles);

// emitter.emit('first');

// makeFolder();
// copyFiles();
