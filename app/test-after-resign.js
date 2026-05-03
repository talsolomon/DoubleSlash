const fs = require('fs')
const e = require('electron')
fs.writeFileSync('/tmp/electron-test.log', 
  'type=' + process.type + '\nelectron_type=' + typeof e + '\nhas_app=' + !!(e && e.app) + '\n'
)
if (e && e.app) {
  e.app.whenReady().then(() => { 
    fs.appendFileSync('/tmp/electron-test.log', 'READY!\n')
    e.app.quit()
  })
}
