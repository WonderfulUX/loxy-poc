import { initNavigationObserver, navObserver, startSequence } from './animate.js';
import * as el from './elements.js';

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
    const YTresponse = await fetch('/api/youtubedata')
    const YTdata = await YTresponse.json()
    console.log(YTdata);

}
async function getSpotifyData() {
    const STFresponse = await fetch('/api/spotifydata')
    const STFdata = await STFresponse.json()
    console.log(STFdata);

}