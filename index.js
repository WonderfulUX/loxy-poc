window.addEventListener("load", ()=>{
    setTimeout(() => {
        requestAnimationFrame(animInterviewBlock)
    }, 1000);
    
})


async function animInterviewBlock(){
    document.querySelector('.interview-title').classList.add('anim')
    setTimeout(()=>{
        document.querySelector('.interview-container').classList.add('anim')
    },800)
    setTimeout(()=>{
        document.querySelector('.interview-link').classList.add('anim')
    },300)
    document.querySelector('.interview-title').addEventListener('animationend',()=>{
        setTimeout(()=>{
            requestAnimationFrame(animOneShotsBlock)
        },500)
    })
}

async function animOneShotsBlock(){
    document.querySelector('.oneShots-title').classList.add('anim')
    setTimeout(()=>{
        document.querySelector('.oneShots-container').classList.add('anim')
    },800)
    setTimeout(()=>{
        document.querySelector('.oneShots-link').classList.add('anim')
    },300)
    document.querySelector('.oneShots-title').addEventListener('animationend',()=>{
        setTimeout(()=>{
            requestAnimationFrame(animPodcastBlock)
        },500)
    })
}
async function animPodcastBlock(){
    document.querySelector('.podcast-title').classList.add('anim')
    setTimeout(()=>{
        document.querySelector('.podcast-container').classList.add('anim')
    },800)
    setTimeout(()=>{
        document.querySelector('.podcast-link').classList.add('anim')
    },300)
    document.querySelector('.podcast-title').addEventListener('animationend',()=>{
        setTimeout(()=>{
            requestAnimationFrame(animOnStageBlock)
        },500)
        
    })
}
async function animOnStageBlock(){
    document.querySelector('.onStage-title').classList.add('anim')
    setTimeout(()=>{
        document.querySelector('.onStage-container').classList.add('anim')
    },800)
    setTimeout(()=>{
        document.querySelector('.onStage-link').classList.add('anim')
    },300)
    document.querySelector('.onStage-title').addEventListener('animationend',()=>{
        setTimeout(()=>{
            requestAnimationFrame(animMain)
        },500)
    })
}

async function animMain(){
    console.log(document.querySelectorAll('.anim'))
    document.querySelector('.main-title').classList.add('anim')
    document.querySelector('.main-title').addEventListener('animationend',()=>{
        document.querySelectorAll('.anim').forEach( ele =>{
            ele.classList.remove('anim')
        })
        setTimeout(()=>{
            requestAnimationFrame(animInterviewBlock)
        })
    })
}
