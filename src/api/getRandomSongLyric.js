const fs = require('fs')

const songLyricsFile = 'songs.txt'

// return a random line from the song lyrics file
const getRandomSongLyric = () => {
  const songLyrics = fs.readFileSync(songLyricsFile, 'utf8').toString().split("\n")
  const randomSongLineNumber = Math.floor(Math.random() * songLyrics.length)
  return songLyrics[randomSongLineNumber]
}
  
module.exports = getRandomSongLyric