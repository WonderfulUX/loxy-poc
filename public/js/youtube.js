function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'API_KEY',
    // clientId and scope are optional if auth is not required.
    // 'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    // 'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
    // FULL PLAYLIST with PLAYLIST ID QUERY PARAMETER and MAXRESULTS = 5 by DEFAULT
    //   'path': 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL70fD2645rWljll6GoR9Izpr_qd7eK7o4&part=snippet,id,contentDetails,status&maxResults=9',


    // UNIQUE ITEM FROM PLAYLIST with ID QUERY PARAMETER
      'path': 'https://www.googleapis.com/youtube/v3/playlistItems?id=UEw3MGZEMjY0NXJXbGpsbDZHb1I5SXpwcl9xZDdlSzdvNC43RjdBQTMwNUUwRTA1QkE3,UEw3MGZEMjY0NXJXbGpsbDZHb1I5SXpwcl9xZDdlSzdvNC5GN0EwRkMxQTJGMTFCNDc1&part=snippet,id,contentDetails,status&maxResults=9',
    
    // RETRIEVE VIDEOS
    //   'path': 'https://www.googleapis.com/youtube/v3/videos?id=UEw3MGZEMjY0NXJXbGpsbDZHb1I5SXpwcl9xZDdlSzdvNC5GN0EwRkMxQTJGMTFCNDc1&part=contentDetails,fileDetails,id,liveStreamingDetails,localizations,paidProductPlacementDetails,player,processingDetails,recordingDetails,snippet,statistics,status,suggestions,topicDetails',
    })
  }).then(function(response) {
    const {items} = response.result;
    console.log(items)
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);