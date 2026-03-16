function start() {
  // 2
  gapi.client.init({
    'apiKey': 'AIzaSyC6HtijIuAiZASDykJycn7aMZLOo1se-OY',
    // clientId and scope are optional if auth is not required.
    // 'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    // 'scope': 'profile',
  }).then(()=>{ retrieveFromYT('interviews') },throwRequestError)
  .then(videosDetailsFromYT, throwRequestError)
//   .then(()=>{ feedSection(videosArray,'interviews') }, throwRequestError)

//   .then(()=>{ retrieveFromYT('oneshots') }, throwRequestError)
//   .then(getOnshotsFromYT,throwRequestError)

//   .then(()=>{ retrieveFromYT('indeh') }, throwRequestError)
//   .then(getOnshotsFromYT,throwRequestError)
};
// 1
gapi.load('client', start);


const YTqueryParams = { 
    interviews : {
        playlistId: "PL70fD2645rWljll6GoR9Izpr_qd7eK7o4",
        maxResults: 6,
    },
    oneshots : {
        playlistId: "PL70fD2645rWn2Zurq2WmSQ-2bPH0NOA2F",
        maxResults: 9,
    },
    indeh : {
        playlistId: "PL70fD2645rWnPn1k_6CVvXMZI0a4G8BvB",
        maxResults: 9,
    },
}


async function retrieveFromYT(sectionName){
    const{ playlistId,maxResults} = YTqueryParams[sectionName]
    console.log('retrieving');
    console.log(playlistId,maxResults,sectionName);
    // console.log(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet,id,contentDetails,status&maxResults=${maxResults}`)
    
    
    return gapi.client.request({
        'path': `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL70fD2645rWljll6GoR9Izpr_qd7eK7o4&part=snippet,id,contentDetails,status&maxResults=6`,
    })
}

async function videosDetailsFromYT(response){
    console.log(response);
    const items = response.result.items
    
    const idList =  retrieveVideoIds(items)
    // return gapi.client.request({
    //     'path': `https://www.googleapis.com/youtube/v3/videos?id=${idList}&part=contentDetails,id,liveStreamingDetails,localizations,paidProductPlacementDetails,player,recordingDetails,snippet,statistics,status,topicDetails`,
    // })
}

function feedSection(videosArray,sectionName){
    const videos = videosArray.result.items
    
    for(let i=0; i<videos.length ; i++){
        document.querySelectorAll(`#${sectionName} .feed-element`)[i].innerHTML 
        = videos[i].player.embedHtml.replace('//','https://')
    }
}


// OOOOOOOLD


// function getOnshotsFromYT(){
//     return gapi.client.request({
//         'path': 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL70fD2645rWn2Zurq2WmSQ-2bPH0NOA2F&part=snippet,id,contentDetails,status&maxResults=9',
//     })
// }
// function getInterviewsFromYT(){
//     return gapi.client.request({
//         'path': 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL70fD2645rWljll6GoR9Izpr_qd7eK7o4&part=snippet,id,contentDetails,status&maxResults=6',
//     })
// }


// function getInterviews(response){
//     const items = response.result.items
//     const idList =  retrieveVideoIds(items)
//     return gapi.client.request({
//         'path': `https://www.googleapis.com/youtube/v3/videos?id=${idList}&part=contentDetails,id,liveStreamingDetails,localizations,paidProductPlacementDetails,player,recordingDetails,snippet,statistics,status,topicDetails`,
//     })
// }

// function feedInterviews(videosArray){
//     const videos = videosArray.result.items
    
//     for(let i=0; i<videos.length ; i++){
//         document.querySelectorAll('#interviews .landscape-element')[i].innerHTML 
//         = videos[i].player.embedHtml.replace('//','https://')
//     }
// }



// UTILITIES
function retrieveVideoIds(items){
    const idList = []
    items.forEach( item =>{
        idList.push(item.contentDetails.videoId)
    })
    
    console.log(`IDs LIST
        ${idList.join()}`)
    return idList.join()
}


// LOGS
function logResponseItems(response){
    const {items} = response.result;
    console.log(items)
    return items
}
function throwRequestError(reason){
    console.log('Error: ' + reason.result.error.message);
}
