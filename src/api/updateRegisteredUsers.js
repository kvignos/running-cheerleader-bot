const Twit = require('twit')
const config = require('../config')

const param = config.twitterConfig

const bot = new Twit(config.twitterKeys)

const fs = require('fs')

const userRegistryFile = 'registeredUsers.txt'

// function: saves user who tweets "Cheer me on @RunCheerleader"
const updateRegisteredUsers = (event) => {
  // get the user's twitter handle/screen name from the event object 
  const screenName = event.user.screen_name
  // get the tweet text
  const text = event.text
  console.log(event.text)
  const optIn = text.includes("cheer me on")
  const optOut = text.includes("opt me out")
  
  if (optIn) {
    fs.appendFile(userRegistryFile, "\n" + screenName, (err) => {  
        if (err) {
          console.log('ERROR: Could not save ', screenName)
        }
        console.log('SUCCESS: Saved ', screenName)
    })  
  }
  
  if (optOut) {
    // we need to read all the lines of the file, string replace to 
    // remove the user, and overwrite the file with the new
      fs.readFile(userRegistryFile, function (err, data) {
        if (err) {
          console.log('ERROR: Cannot read file: ', userRegistryFile)
        }
        // use new lines before and after screenNames for exact match
        const newData = data.toString().replace("\n"+screenName+"\n", "\n")
        
        fs.writeFile(userRegistryFile, newData, (err) => {
          if (err) {
            console.log('ERROR: Could not remove ', screenName)
          }
          console.log('SUCCESS: Removed ', screenName)
        })
      })  
    
  }  
}

module.exports = updateRegisteredUsers
