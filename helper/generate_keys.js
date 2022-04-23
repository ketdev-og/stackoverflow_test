
//json web tokens secrete keys 
const crypto = require('crypto')
const key1 = crypto.randomBytes(32).toString('hex')
const key2 = crypto.randomBytes(32).toString('hex')

console.table(["use key for refresh and access key in config file",key1,key2]);