const fs = require('fs')
const e = require('electron')
const log = 'type=' + process.type + '\nelectron_type=' + typeof e + '\nhas_app=' + !!(e && e.app) + '\n'
console.log(log)
fs.writeFileSync('/tmp/electron-test.log', log)
if (e && e.app) {
  e.app.commandLine.appendSwitch('no-sandbox')
  e.app.whenReady().then(() => {
    fs.appendFileSync('/tmp/electron-test.log', 'READY!\n')
    e.app.quit()
  })
}
