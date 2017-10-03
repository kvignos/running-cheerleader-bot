// bot features
const Twit = require('twit')
const config = require('./config')

const bot = new Twit(config.twitterKeys)

const updateRegisteredUsers = require('./api/updateRegisteredUsers')
const queryRegisteredUsers = require('./api/queryRegisteredUsers')

// retweet on keywords
setInterval(queryRegisteredUsers, config.twitterConfig.retweet)

// manage registered users
const registeredUsers = bot.stream('statuses/filter', { track: 'cheer me on runcheerleader, opt me out runcheerleader'})
registeredUsers.on('tweet', updateRegisteredUsers)


