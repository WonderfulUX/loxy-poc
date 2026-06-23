

export async function getToken(clientId, clientSecret) {
    const data = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(
                clientId + ":" + clientSecret
            ).toString("base64"),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    const tk = await data.json()
    console.log(tk);

    return tk
}


export async function getProfile(accessToken, spotifyUserId) {
    console.log(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists`);

    // const response = await fetch(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists`, {
    // const response = await fetch(`https://api.spotify.com/v1/search?q=Loxymore&type=podcastAndEpisodes&limit=10`, {
    const response = await fetch(`https://api.spotify.com/v1/shows/${spotifyUserId}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    // console.log('*******');
    // console.log('Status:', response.status);
    // console.log('*******');

    const data = await response.json();

    return data;
}
