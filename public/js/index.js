import * as el from './elements.js';

const ANIM_DURATION = 6000; // Matches your 6s CSS animations

function startSequence() {
    animInterviewBlock();
}

// Helper to handle the class cycling
function playStep(title, ctn, link, next) {
    // 1. Reset all first to ensure a clean slate
    resetAnimElements();

    // 2. Trigger animations
    title.classList.add('anim');
    
    // Use the same delays defined in your CSS variables
    setTimeout(() => ctn.classList.add('anim'), 800); 
    setTimeout(() => link.classList.add('anim'), 300);

    // 3. One-time listener for the end of THIS specific step
    title.addEventListener('animationend', () => {
        setTimeout(next, 500); // Small buffer before next section
    }, { once: true }); // Automatically removes listener
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

window.addEventListener("load", () => setTimeout(startSequence, 1000));