import {
    interviewCTN,
    interviewTITLE,
    interviewLINK,
    oneShotsCTN,
    oneShotsTITLE,
    oneShotsLINK,
    podcastCTN,
    podcastTITLE,
    podcastLINK,
    onStageCTN,
    onStageTITLE,
    onStageLINK,
    cultureTITLE

} from './elements.js'

window.addEventListener("load", ()=>{
    setTimeout(() => {
        requestAnimationFrame(animInterviewBlock)
    }, 1000);
    
})



function animInterviewBlock(){
    animBlock(interviewTITLE,interviewCTN, interviewLINK, animOneShotsBlock)
}

function animOneShotsBlock(){
    resetAnimElements()
    animBlock(oneShotsTITLE,oneShotsCTN, oneShotsLINK, animPodcastBlock)
}

function animPodcastBlock(){
    resetAnimElements()
    animBlock(podcastTITLE,podcastCTN, podcastLINK,animOnStageBlock)
}

function animOnStageBlock(){
    resetAnimElements()
    animBlock(onStageTITLE,onStageCTN,onStageLINK,animLast)
}


function animLast(){
    cultureTITLE.classList.add('anim')
    cultureTITLE.addEventListener('animationend',()=>{
        resetAnimElements()
        setTimeout(()=>{
            requestAnimationFrame(animInterviewBlock)
        },500)
    })
}



async function animBlock(container,title,link, nextFunction){
    title.classList.add('anim')
    setTimeout(()=>{ container.classList.add('anim') },800)
    setTimeout(()=>{ link.classList.add('anim') },300)
    
    title.addEventListener('animationend',e=>{ requestNext(e,nextFunction) })
}

function requestNext( ele,nextFunction ){
    setTimeout(()=>{ 
        requestAnimationFrame(nextFunction)
        ele.target.removeEventListener('animationend',e => requestNext(e,nextFunction) )
     },500)
}

function resetAnimElements(){
    document.querySelectorAll('.anim').forEach( ele =>{
        ele.classList.remove('anim')
    })
}