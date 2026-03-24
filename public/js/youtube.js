// 1. GLOBAL STATE & API LOADING
var isYTAPILoaded = false;

// Load the YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This is called automatically by the YouTube Script when finished loading
window.onYouTubeIframeAPIReady = function() {
    isYTAPILoaded = true;
};

// 2. GAPI DATA INITIALIZATION
function start() {
    gapi.client.init({
        'apiKey': 'AIzaSyC6HtijIuAiZASDykJycn7aMZLOo1se-OY',
    })
    .then(() => retrieveFromYT('interviews'))
    .then(videosDetailsFromYT)
    .then(videosArray => feedSection(videosArray, 'interviews'))

    .then(() => retrieveFromYT('oneshots'))
    .then(videosDetailsFromYT)
    .then(videosArray => feedSection(videosArray, 'oneshots'))

    .then(() => retrieveFromYT('indeh'))
    .then(videosDetailsFromYT)
    .then(videosArray => feedSection(videosArray, 'indeh'))
    .catch(throwRequestError);
}

gapi.load('client', start);

const YTqueryParams = { 
    interviews : { playlistId: "PL70fD2645rWljll6GoR9Izpr_qd7eK7o4", maxResults: 6 },
    oneshots : { playlistId: "PL70fD2645rWn2Zurq2WmSQ-2bPH0NOA2F", maxResults: 6 },
    indeh : { playlistId: "PL70fD2645rWnPn1k_6CVvXMZI0a4G8BvB", maxResults: 6 }
};

// 3. LOGIC FUNCTIONS
function displayImages(videosArray,sectionName){
    const videos = videosArray.result.items  //console.log(videos);
    for(let i=0; i<videos.length ; i++){
        const feedImg = document.createElement('img')
        feedImg.src = videos[i].snippet.thumbnails.standard.url
        feedImg.id = videos[i].id
        feedImg.classList.add('cover')
        document.querySelectorAll(`#${sectionName} .feed-element`)[i].appendChild(feedImg)
    }
}

function displayVideos(videosArray, sectionName) {
    const videos = videosArray.result.items;
    const elements = document.querySelectorAll(`#${sectionName} .iframe-container`);

    videos.forEach((video, i) => {
        if (!elements[i]) return;

        // Assign a unique ID to the div
        const targetId = `player-${video.id}`; 
        elements[i].id = targetId;

        // Use a helper function to avoid loop-scope issues
        initializePlayerWhenReady(targetId, video.id);
    });
}

// This helper ensures each video gets its own polling interval and closure
function initializePlayerWhenReady(divId, videoId) {
    if (isYTAPILoaded) {
        createYTPlayer(divId, videoId);
    } else {
        console.log(`Waiting for API to load for video: ${videoId}`);
        const checkReady = setInterval(() => {
            if (isYTAPILoaded) {
                createYTPlayer(divId, videoId);
                clearInterval(checkReady);
            }
        }, 100);
    }
}

function createYTPlayer(divId, videoId) {
    // Ensure the element actually exists in the DOM with this ID
    const el = document.getElementById(divId);
    
    if (!el) {
        console.error("Could not find element with ID:", divId);
        return;
    }

    // A 50ms delay gives the browser a "breather" to register the ID change
    setTimeout(() => {
        try {
            new YT.Player(divId, {
                height: '360',
                width: '640',
                videoId: videoId,
                playerVars: { 
                    'playsinline': 1,
                    'controls': 0,   
                    'disablekb': 1, 
                    'rel': 0,     
                    'modestbranding': 1
                 },
                events: {
                    'onReady': () => console.log('New player ready', divId)
                }
            });
        } catch (e) {
            console.error("YT Player Error:", e);
        }
    }, 50);
}

// 4. REMAINING UTILITIES (Unchanged)
function retrieveFromYT(sectionName){
    const { playlistId, maxResults } = YTqueryParams[sectionName];
    return gapi.client.request({
        'path': `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet,id,contentDetails,status&maxResults=${maxResults}`,
    });
}

async function videosDetailsFromYT(response){
    const items = response.result.items;
    const idList = retrieveVideoIds(items);
    return gapi.client.request({
        'path': `https://www.googleapis.com/youtube/v3/videos?id=${idList}&part=contentDetails,id,player,snippet`,
    });
}

function feedSection(videosArray, sectionName){
    const loadingEl = document.querySelector(`#${sectionName} .loading`);
    if(loadingEl) loadingEl.classList.remove('loading');
    displayVideos(videosArray, sectionName);
    // displayImages(videosArray, sectionName);
}

function retrieveVideoIds(items){
    return items.map(item => item.contentDetails.videoId).join(',');
}

function throwRequestError(reason){
    console.log('Error: ' + reason.result.error.message);
}