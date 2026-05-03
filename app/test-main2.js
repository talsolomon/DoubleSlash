"use strict";
// Try different import paths
try {
  const e = require('electron/main');
  console.log('electron/main type:', typeof e);
  console.log('has app:', !!e.app);
} catch(err) {
  console.log('electron/main error:', err.message);
}
try {
  const { app } = require('electron');
  console.log('electron.app type:', typeof app);
} catch(err) {
  console.log('electron error:', err.message);
}
