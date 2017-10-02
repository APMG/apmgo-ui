var apm_account = new ApmAccount('/apm_accounts')
if(!apm_account.is_logged_in()) {
  window.location.href = apm_account.log_in_path()
}
// Verify we have a current auth token, then fetch data
if(apm_account.get_expires_at() < Date.now()) {
  apm_account.refresh()
    .then(function (token) {
      setupAudioInteraction(apm_account.get_token())
    })
    .catch(function (error) {
      console.error('Could not refresh access token')
    })
} else {
  setupAudioInteraction(apm_account.get_token())
}

function setupAudioInteraction(authToken) {
  var addButton = document.createElement('button')
  addButton.innerHTML = 'Add to Playlist'
  addButton.classList += 'add-audio-button'

  var apiEndpoint = '//bragi-api.publicradio.org/items'

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
