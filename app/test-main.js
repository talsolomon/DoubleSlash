"use strict";
const electron = require('electron');
console.log('electron type:', typeof electron);
if (typeof electron === 'object') {
  console.log('electron.app:', electron.app);
  console.log('electron keys:', Object.keys(electron).slice(0,5));
} else {
  console.log('electron value (string):', String(electron).slice(0, 80));
}
