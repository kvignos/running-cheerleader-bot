const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const queryStringArray = ['strava run','completed run runkeeper']
//const queryString = unique(queryStringArray)
const queryString = 'strava run'

const bot = new Twit(config.twitterKeys)

const retweet = (screenName) => {
  //console.log(screenName)
  if (screenName) {
    //const query = 'from:' + screenName + ' ' + queryString
    // {"statuses":[],"search_metadata":{"completed_in":0.06,"max_id":912063934668173300,"max_id_str":"912063934668173313","query":"from%3AIdRatherRun+strava+run+filter%3Asafe","refresh_url":"?since_id=912063934668173313&q=from%3AIdRatherRun%20strava%20run%20filter%3Asafe&lang=en&result_type=mixed&include_entities=1","count":2,"since_id":0,"since_id_str":"0"}}
    
    // tweet url https://twitter.com/chierotti/status/912063253722931200
    // this url for the tweet is data.statuses[0].entities.media[0].url
    // maybe create a new tweet with the song lyric and paste in this tweet url? 
    // yes, that kicks off a notification, so good enough?
    const query = "strava run"
    //console.log(query)
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
          let retweetId
          try {
            // retweet the first one
            console.log(JSON.stringify(data))
            retweetId = data.statuses[0].id_str
          } catch (e) {
            console.log('ERRORDERP: Cannot assign retweetID; exception message: ' + e.message);
            return
          }
  // TODO: add a conditional to only post if there's a retweetId.
          bot.post(
            'statuses/retweet/:id',
            {
              id: retweetId
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
    )
  }
}

module.exports = retweet
