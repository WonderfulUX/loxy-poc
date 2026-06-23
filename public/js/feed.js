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