import * as el from './elements.js';

export function startSequence() {
    animInterviewBlock();
}

function playStep(title, ctn, link, next) {
    resetAnimElements();
    ctn.querySelector('.lazyLoad') && loadSource(ctn)


    title.classList.add('anim');


    setTimeout(() => ctn.classList.add('anim'), 800);
    setTimeout(() => link.classList.add('anim'), 300);

    title.addEventListener('animationend', () => {
        setTimeout(next, 500);
    }, { once: true });
}

function animInterviewBlock() {
    playStep(el.interviewTITLE, el.interviewCTN, el.interviewLINK, animOneShotsBlock);
}

function animOneShotsBlock() {
    playStep(el.oneShotsTITLE, el.oneShotsCTN, el.oneShotsLINK, animPodcastBlock);
}

function animPodcastBlock() {
    playStep(el.podcastTITLE, el.podcastCTN, el.podcastLINK, animOnStageBlock);
}

function animOnStageBlock() {
    playStep(el.onstageTITLE, el.onstageCTN, el.onstageLINK, animLast);
}

function animLast() {
    resetAnimElements();
    el.cultureTITLE.classList.add('anim');
    el.logo.classList.add('anim')
    el.cultureTITLE.addEventListener('animationend', () => {
        setTimeout(animInterviewBlock, 500);
    }, { once: true });
}

function resetAnimElements() {
    document.querySelectorAll('.anim').forEach(ele => ele.classList.remove('anim'));
}

function loadSource(videoBlockContainer) {

    videoBlockContainer.querySelectorAll('source').forEach(tag => {
        tag.setAttribute('src', tag.getAttribute('data-src'))
    })
    videoBlockContainer.querySelector('video').load()
    videoBlockContainer.querySelector('video').classList.remove('lazyLoad')
}


export function initNavigationObserver() {
    scrollObserver.observe(el.aboutLoxymore)
    scrollObserver.observe(el.aboutInterviews)
    scrollObserver.observe(el.aboutIndeh)
    scrollObserver.observe(el.aboutOneshot)
    scrollObserver.observe(el.aboutLivestories)
    scrollObserver.observe(el.aboutFestivaltour)
    scrollObserver.observe(el.aboutOnstage)
    scrollObserver.observe(el.aboutCorsair)
    scrollObserver.observe(el.aboutEntertainers)
    scrollObserver.observe(el.contactShorty)
}


export const navObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelector
                ('aside').classList.remove('show')
        }
        else {
            document.querySelector
                ('aside').classList.add('show')
        }
    })
},
    {
        threshold: 0,
        rootMargin: '0px'
    }

)
const scrollObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        const id = entry.target.id
        if (entry.isIntersecting) {
            document.querySelector(`aside .about-quick-link[data-target="${id}"] .link-position`).classList.add('highlight')
        }
        else {
            document.querySelector(`aside .about-quick-link[data-target="${id}"] .link-position`).classList.remove('highlight')
        }
    })
},
    {
        threshold: 0,
        rootMargin: "-49% 0px -49% 0px"
    }

)