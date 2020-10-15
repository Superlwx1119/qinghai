const zipFolder = require('folder-zip-sync')
const fs = require('fs')
const path = require('path')

if (!fs.existsSync(path.resolve(__dirname, '../war'))) {
  fs.mkdirSync(path.resolve(__dirname, '../war'))
}
zipFolder('./dist', `./war/admin.war`)
