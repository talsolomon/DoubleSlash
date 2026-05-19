"use strict";
console.log('process.type:', process.type);
// Try requiring electron AFTER setting up
const path = require('path');
const Module = require('module');

// Print require.resolve for electron
try {
  const resolved = require.resolve('electron');
  console.log('require.resolve electron:', resolved);
} catch(e) {
  console.log('resolve error:', e.message);
}
