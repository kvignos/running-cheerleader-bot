const retweet = require('./retweet')
const fs = require('fs')

const userRegistryFile = 'registeredUsers.txt'

// check the registeredUsers file and for each user, retweet based on query.
const queryRegisteredUsers = () => {
  console.log('query')
  fs.readFile(userRegistryFile, function (err, data) {
    if (err) {
      console.log('ERROR: Cannot read file: ')
    }
    data.toString().split("\n").forEach(function (e) {retweet(e)})
  })    
}

module.exports = queryRegisteredUsers