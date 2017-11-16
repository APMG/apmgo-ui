// NOTE: This example code is non-functional until authentication has been implmented
// A valid OAuth2 Bearer Token must be passed to setupAudioInteraction
// This is an example using the same interface as app/javascript/lib/service/auth-layer.js

var authLayer = new AuthLayer()

ready(function() {
  if(!authLayer.isLoggedIn()) {
    window.location.href = authLayer.logInPath()
  }
  // Verify we have a current auth token, then fetch data
  if(authLayer.getExpiresAt() < Date.now()) {
    authLayer.refresh()
      .then(function (token) {
        setupAudioInteraction(authLayer.getToken())
      })
      .catch(function (error) {
        console.error('Could not refresh access token')
      })
  } else {
    setupAudioInteraction(authLayer.getToken())
  }
})

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function setupAudioInteraction(authToken) {
  var addButton = document.createElement('button')
  addButton.innerHTML = 'Add to Playlist'
  addButton.classList += 'add-audio-button'

  var apiEndpoint = '//apmgo-api.example.org/items'

  var requestHeaders = [
    {'Content-Type': 'application/json; charset=UTF-8'},
    {'Authorization': 'Bearer ' + authToken }
  ]

  bootstrapAudioInteraction(addButton, apiEndpoint, requestHeaders);
}

function bootstrapAudioInteraction(addButtonTemplate, apiEndpoint, requestHeaders) {
  var audioMetadata = document.querySelectorAll('script[data-bragi-audio=true]')
  console.log(audioMetadata)
  Array.prototype.forEach.call(audioMetadata, function(audioMetadataNode, idx) {
    var audioMetadataJSON = JSON.parse(audioMetadataNode.innerText)
    var audioNode = audioMetadataNode.parentElement.querySelector('audio')
    var addButton = addButtonTemplate.cloneNode(true)
    addButton.addEventListener('click', function() {
      postAudioData(apiEndpoint, requestHeaders, audioMetadataJSON)
    })
    audioNode.parentElement.insertBefore(addButton, audioNode.nextSibling)
  })
}

function postAudioData(apiEndpoint, requestHeaders, audioMetadataJSON) {
  var payload = buildPayload(audioMetadataJSON)
  var request = new XMLHttpRequest();
  request.open('POST', apiEndpoint, true);
  Array.prototype.forEach.call(requestHeaders, function(requestHeader) {
    request.setRequestHeader(
      Object.keys(requestHeader)[0],
      requestHeader[Object.keys(requestHeader)[0]]
    )
  })
  request.send(payload);
  request.onload = function(err) {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var resp = request.responseText;
      console.log("Request success")
    } else {
      // We reached our target server, but it returned an error
      console.error("Server error")
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.error("Connection failed")
  };
}

function buildPayload(metadata) {
  var payload = {
    data: {
        attributes: {
            after: null,
            audio_description: metadata.description,
            audio_hosts: metadata.creator.name,
            audio_identifier: metadata.identifier,
            audio_image_url: metadata.imageUrl,
            audio_program: null,
            audio_publish_datetime: metadata.uploadDate,
            audio_title: metadata.name,
            audio_url: metadata.contentUrl,
            finished: null,
            origin_url: metadata.isPartOf.url,
            playtime: 0,
            source: metadata.creator.url,
            status: "unplayed"
        },
        type: "bragi-items"
    }
  }
  return JSON.stringify(payload)
}
