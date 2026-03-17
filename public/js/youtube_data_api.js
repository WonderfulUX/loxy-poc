function start() {
  // 2
  gapi.client.init({
    'apiKey': 'AIzaSyC6HtijIuAiZASDykJycn7aMZLOo1se-OY',
    // clientId and scope are optional if auth is not required.
    // 'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    // 'scope': 'profile',
  }).then(()=> retrieveFromYT('interviews'))
  .then(videosDetailsFromYT)
  .then(videosArray =>feedSection(videosArray,'interviews'))

//   .then(()=> retrieveFromYT('oneshots'))
//   .then(videosDetailsFromYT)
//   .then(videosArray =>feedSection(videosArray,'oneshots'))

//   .then(()=> retrieveFromYT('indeh'))
//   .then(videosDetailsFromYT)
//   .then(videosArray =>feedSection(videosArray,'indeh'))

  .catch(throwRequestError)
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
        maxResults: 6,
    },
    indeh : {
        playlistId: "PL70fD2645rWnPn1k_6CVvXMZI0a4G8BvB",
        maxResults: 9,
    },
}


function retrieveFromYT(sectionName){
    const{ playlistId,maxResults} = YTqueryParams[sectionName]     // console.log('retrieving'); // console.log(playlistId,maxResults,sectionName);    
    return gapi.client.request({
        'path': `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet,id,contentDetails,status&maxResults=${maxResults}`,
    })
}

async function videosDetailsFromYT(response){
    const items = response.result.items     // console.log(items);
    const idList =  retrieveVideoIds(items)
    return gapi.client.request({
        'path': `https://www.googleapis.com/youtube/v3/videos?id=${idList}&part=contentDetails,id,liveStreamingDetails,localizations,paidProductPlacementDetails,player,recordingDetails,snippet,statistics,status,topicDetails`,
    })
}

function feedSection(videosArray,sectionName){
    document.querySelector(`#${sectionName} .loading`).classList.remove('loading')
    displayVideos(videosArray,sectionName)
    displayImages(videosArray,sectionName)
}


function displayImages(videosArray,sectionName){
    const videos = videosArray.result.items 
    console.log(videos);
    for(let i=0; i<videos.length ; i++){
        const feedImg = document.createElement('img')
        feedImg.src = videos[i].snippet.thumbnails.standard.url
        feedImg.classList.add('cover')
        document.querySelectorAll(`#${sectionName} .feed-element`)[i].appendChild(feedImg)
    }
}
function displayVideos(videosArray,sectionName){
    const videos = videosArray.result.items 
    console.log(videos);
    for(let i=0; i<videos.length ; i++){
        document.querySelectorAll(`#${sectionName} .feed-element`)[i].innerHTML 
        = videos[i].player.embedHtml.replace('//','https://')
    }
}



// UTILITIES
function retrieveVideoIds(items){
    const idList = []
    items.forEach( item =>{
        idList.push(item.contentDetails.videoId)
    })
    
    // console.log(`IDs LIST
    //     ${idList.join()}`)
    return idList.join()
}

function throwRequestError(reason){
    console.log('Error: ' + reason.result.error.message);
}
