import { initNavigationObserver, navObserver, startSequence } from './animate.js';
import * as el from './elements.js';
import { buildPlaylistItem, feedSection } from './feed.js';

window.addEventListener("load", () => {
    el.interviewCTN && setTimeout(startSequence, 350)
    el.interviewCTN && getYoutubeData()
    el.interviewCTN && getSpotifyData()
    el.anchor && navObserver.observe(el.anchor)
    el.anchor && initNavigationObserver()
}
);


el.menuToggle.addEventListener('click', toggleMenu)
el.menuBackdrop.addEventListener('click', toggleMenu)


function toggleMenu(e) {

    if (e.target.classList.contains('nav-backdrop')
        || e.target.classList.contains('toggle')
        || e.target.classList.contains('menu-line')
        || e.target.id === 'menu-toggle'
        || e.target.closest('.nav-link')
    ) {
        el.menuBackdrop.classList.toggle('display')
        el.menuToggle.classList.toggle('toggle')
        document.body.classList.toggle('locked')
        document.querySelector('nav').classList.toggle('slideIn')
    }
}

async function getYoutubeData() {
    const YTresponse = await fetch('/api/get-youtube-playlists-data')
    const YTdata = await YTresponse.json()
    // console.log('******************************');
    // console.log(YTdata);

    for (const category in YTdata) {
        feedSection(category, YTdata[category])
    }

}
async function getSpotifyData() {
    const STFresponse = await fetch('/api/get-spotify-podcasts')
    const data = await STFresponse.json()
    const shortList = data.episodes.items.slice(0, 5)
    // console.log(shortList);
    shortList.forEach(playlistItem => buildPlaylistItem(playlistItem));
    document.querySelector('.podcast-grid.loading').classList.remove('loading')
}