import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { getProfile, getToken } from './spotify.js'
import { retrieveYTdata } from './youtubeData.js'


const __dirname = import.meta.dirname
dotenv.config()
const PORT = process.env.PORT
const SPOTIFY_CID = process.env.SPOTIFY_CID
const SPOTIFY_CSECRET = process.env.SPOTIFY_CSECRET
const YT_API_KEY = process.env.YT_API_KEY
const LOXYMORE_SPOTIFY_ID = process.env.LOXYMORE_SPOTIFY_ID
const LOXYMORE_PDC_SPOTIFY_ID = process.env.LOXYMORE_PDC_SPOTIFY_ID

// console.log(process.env);
let token = null
let expiringDate = null


const app = express()
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/about', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
})


app.get('/api/get-youtube-playlists-data', async (_, res) => {
    const YTdata = await retrieveYTdata()
    res.send(YTdata)
})

app.get('/api/get-spotify-podcasts', async (_, res) => {
    // res.json({ message: 'Response from spotify' })
    if (!token || Date.now() > expiringDate) {
        const tokenObj = await getToken(SPOTIFY_CID, SPOTIFY_CSECRET)
        token = tokenObj.access_token
        expiringDate = Date.now() + tokenObj.expires_in * 1000
    }
    // console.log('Token : ', token);
    // console.log('Expires in : ', expiringDate);
    const data = await getProfile(token, LOXYMORE_PDC_SPOTIFY_ID)
    // console.log(data);

    res.send(data)
})

app.listen(PORT, () => {
    console.log('Listening on this port :', PORT);

})


