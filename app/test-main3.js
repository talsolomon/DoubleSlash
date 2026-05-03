"use strict";
console.log('process.versions.electron:', process.versions.electron);
console.log('process.type:', process.type);
// Check what require hooks are registered
const Module = require('module');
console.log('Module builtinModules includes electron:', Module.builtinModules.includes('electron'));

// Try to get electron through the actual process
const electronApp = process.type === 'browser' ? require('electron').app : null;
console.log('electronApp:', electronApp);
