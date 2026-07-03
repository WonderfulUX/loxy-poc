import dotenv from "dotenv"
import { GoogleApis } from "googleapis"

dotenv.config()
const YT_API_KEY = process.env.YT_API_KEY
const YTqueryParams = {
    interviews: {
        playlistId: "PL70fD2645rWljll6GoR9Izpr_qd7eK7o4",
        maxResults: 6,
    },
    oneshots: {
        playlistId: "PL70fD2645rWn2Zurq2WmSQ-2bPH0NOA2F",
        maxResults: 6,
    },
    indeh: {
        playlistId: "PL70fD2645rWnPn1k_6CVvXMZI0a4G8BvB",
        maxResults: 6,
    },
}
const YTdata = {
    interviews: {},
    oneshots: {},
    indeh: {}
}


export async function retrieveYTdata() {
    try {
        const interviewsPlaylistData = await retrieveFromYT('interviews')
        const interviewsEmbeddedFramesDetails = await videosDetailsFromYT(interviewsPlaylistData)
        YTdata.interviews = { ...interviewsEmbeddedFramesDetails, playlistId: YTqueryParams['interviews'].playlistId }

        const oneshotsPlaylistData = await retrieveFromYT('oneshots')
        const oneshotsEmbeddedFramesDetails = await videosDetailsFromYT(oneshotsPlaylistData)
        YTdata.oneshots = { ...oneshotsEmbeddedFramesDetails, playlistId: YTqueryParams['oneshots'].playlistId }

        const indehPlaylistData = await retrieveFromYT('indeh')
        const indehEmbeddedFramesDetails = await videosDetailsFromYT(indehPlaylistData)
        YTdata.indeh = { ...indehEmbeddedFramesDetails, playlistId: YTqueryParams['indeh'].playlistId }
        return YTdata
    }
    catch (e) {
        console.log(e)
    }
}



async function retrieveFromYT(sectionName) {
    const { playlistId, maxResults } = YTqueryParams[sectionName]     // console.log('retrieving'); // console.log(playlistId,maxResults,sectionName);    
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet,id,contentDetails,status&maxResults=${maxResults}&key=${YT_API_KEY}`,
    )
    const data = await response.json()
    // console.log("--- data ---", data);
    return data
}

async function videosDetailsFromYT(response) {
    console.log(response.items);
    const items = response.items     // console.log(items);
    const idList = retrieveVideoIds(items)
    const framesDetails = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${idList}&part=contentDetails,id,liveStreamingDetails,localizations,paidProductPlacementDetails,player,recordingDetails,snippet,statistics,status,topicDetails&key=${YT_API_KEY}`,
    )
    const data = await framesDetails.json()
    console.log("--- data from function 2 ---", data);
    return data
}


// UTILITIES
function retrieveVideoIds(items) {
    const idList = []
    items.forEach(item => {
        idList.push(item.contentDetails.videoId)
    })
    return idList.join()
}

function throwRequestError(reason) {
    console.log('Error: ' + reason.result.error.message);
}
