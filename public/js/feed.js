// SPOTIFY
export function buildPlaylistItem(data) {
    // console.log(data);

    const playlistItem = document.createElement('div')
    playlistItem.classList.add('podcast-element')
    playlistItem.innerHTML = `
            <a class="podcast-element-link" href="https://open.spotify.com/episode/${data.id}" target="_blank">
                <img class="podcast-element-img" src="${data.images[0].url}" >
                <div class="podcast-element-content" >
                    <h4 class="podcast-element-title">${data.name}</h4>
                    <p class="podcast-element-description">${data.description}</p>
                </div>
            </a>`
    document.querySelector('.podcast-grid').append(playlistItem)
}



// YOUTUBE

var isYTAPILoaded = false;

// Load the YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This is called automatically by the YouTube Script when finished loading
window.onYouTubeIframeAPIReady = function () {
    isYTAPILoaded = true;
};



export function feedSection(sectionName, sectionData) {
    // console.log(sectionName);
    // document.querySelector(`#${sectionName} .loading`).classList.remove('loading')
    // displayVideos(sectionData.items, sectionName)
    displayImages(sectionData.items, sectionName)
    updateSectionLink(sectionName, sectionData['playlistId']);
}

function displayImages(videosArray, sectionName) {
    //console.log(videos);

    for (let i = 0; i < videosArray.length; i++) {
        console.log(videosArray);
        const feedImg = document.createElement('img')
        feedImg.src = videosArray[i].snippet.thumbnails.standard.url
        feedImg.id = videosArray[i].id
        feedImg.setAttribute('width', 740)
        feedImg.setAttribute('height', 480)
        feedImg.classList.add('cover')

        document.querySelectorAll(`#${sectionName} .feed-element-link`)[i].setAttribute('href', `https://www.youtube.com/watch?v=${videosArray[i].id}`)
        document.querySelectorAll(`#${sectionName} .feed-element-link`)[i].appendChild(feedImg)
    }
}

function displayVideos(videosArray, sectionName) {
    const elements = document.querySelectorAll(`#${sectionName} .iframe-container`);

    videosArray.forEach((video, i) => {
        if (!elements[i]) return;

        // Assign a unique ID to the div
        const targetId = `player-${video.id}`;
        elements[i].id = targetId;

        // Use a helper function to avoid loop-scope issues
        initializePlayerWhenReady(targetId, video.id);
    });
}

function updateSectionLink(sectionName, sectionLinkId) {
    const linkElement = document.querySelector(`#${sectionName} .pageLink`)
    linkElement.setAttribute("href", `https://www.youtube.com/playlist?list=${sectionLinkId}`)
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
