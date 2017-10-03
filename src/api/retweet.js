const Twit = require('twit')

const config = require('../config')
const getRandomSongLyric = require('./getRandomSongLyric')

const param = config.twitterConfig
const keywords = 'runmeter distance'

const yesterdayDate = new Date()
yesterdayDate.setDate(yesterdayDate.getDate()-1)
const yesterdayString = yesterdayDate.getFullYear() + '-' + ( yesterdayDate.getMonth() + 1 ) + '-' + yesterdayDate.getDate() 

const bot = new Twit(config.twitterKeys)

const retweet = (screenName) => {
  if (screenName) {
    // construct the search query with the specific user handle, search keywords, since yesterday.
    const query = 'from:'+ screenName + ' ' + keywords + ' since:' + yesterdayString
    bot.get(
      'search/tweets',
      {
        q: query,
        result_type: param.resultType,
        lang: param.language,
        filter: 'safe',
        count: param.searchCount
      },
      (err, data, response) => {
        if (err) {
          console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
        } else {     
          // if we have a match on our search, at least 1 status will be returned
          if (data.statuses.length > 0) {
            // create a tweet by getting a random song lyric and adding the retweet url
            const retweetUrl = 'https://twitter.com/' + screenName + '/status/' + data.statuses[0].id_str
            const statusText = getRandomSongLyric() + ' ' + retweetUrl          
            bot.post(
              'statuses/update', 
              { 
                status: statusText      
              }, 
              (err, response) => {
                if (err) {
                  console.log('ERRORDERP: Retweet!')
                }              
                console.log('SUCCESS: RT: ', data.statuses[0].text)
              }
            )
          }
        }
      }
    )
  }
}

module.exports = retweet
