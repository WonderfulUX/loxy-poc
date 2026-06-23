// SPOTIFY
export function buildPlaylistItem(data) {
    const playlistItem = document.createElement('div')
    playlistItem.classList.add('podcast-element')
    playlistItem.innerHTML = `
            <a class="podcast-element-link" href="${data.href}">
                <img class="podcast-element-img" src="${data.images[0].url}" >
                <div class="podcast-element-content" >
                    <h4 class="podcast-element-title">${data.name}</h4>
                    <p class="podcast-element-description">${data.description}</p>
                </div>
            </a>`
    document.querySelector('.podcast-grid').append(playlistItem)
}



// YOUTUBE
export function feedSection(sectionName, sectionData) {
    console.log(sectionName);
    document.querySelector(`#${sectionName} .loading`).classList.remove('loading')
    displayVideos(sectionData.items, sectionName)
    displayImages(sectionData.items, sectionName)
}


function displayImages(videosArray, sectionName) {
    const videos = videosArray  //console.log(videos);
    for (let i = 0; i < videos.length; i++) {
        const feedImg = document.createElement('img')
        feedImg.src = videos[i].snippet.thumbnails.standard.url
        feedImg.classList.add('cover')
        document.querySelectorAll(`#${sectionName} .feed-element`)[i].appendChild(feedImg)
    }
}
function displayVideos(videosArray, sectionName) {
    const videos = videosArray  //console.log(videos);
    for (let i = 0; i < videos.length; i++) {
        document.querySelectorAll(`#${sectionName} .feed-element`)[i].innerHTML
            = videos[i].player.embedHtml.replace('//', 'https://')
    }
}