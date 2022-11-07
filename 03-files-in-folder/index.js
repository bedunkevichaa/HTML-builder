const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), function(err, items) {
  if (err) console.error(message.error);

  for (let i = 0; i < items.length; i++) {
    let file = path.join(__dirname, 'secret-folder') + '/' + items[i];
    fs.stat(file, getFilelList(file));
  }
});

function getFilelList(file) {
  return function(err, stats) {
    if (stats.isFile()) {
      console.log(`${file.replace(path.extname(file), '').replace(path.join(__dirname, 'secret-folder') + '/', '')} - ${path.extname(file).replace('.', '')} - ${formatBytes(stats['size'])}`);
    }
  }
}

function formatBytes(bytes, decimals = 3) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes','KB','MB','GB','TB','PB','EB','ZB','YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

