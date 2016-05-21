var spNsiSc = require('./index.js')
var fs = require('fs')

fs.createReadStream('./fixtures/1.cmd')
.pipe(spNsiSc())
.on('data', function (d) {
  console.log(d);
  /*
  [ { name: 'author', value: 'me' },
  { name: 'version', value: '6.6.6' },
  { name: 'description',
    value: 'The description of whatever this script does' },
  { env: false, name: 'wd', value: 'C:\\whatever\\' },
  { env: false, name: 'cmd', value: '""' },
  { env: false, name: 'stdout', value: '""' },
  { env: false, name: 'stderr', value: '""' },
  { env: true, name: 'some', value: 'thing' },
  { env: true, name: 'else', value: 'yep' } ]
  */
})
