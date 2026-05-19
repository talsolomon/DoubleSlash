const fs = require('fs');
const path = require('path');
fs.writeFileSync('/tmp/electron-test.log', 
  'process.type=' + process.type + '\n' +
  'electron type=' + typeof require('electron') + '\n'
);
