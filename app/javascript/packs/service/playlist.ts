import { BragiApiClient } from "./api";
import { PlaylistItemType } from '../redux/types'

export function fetchPlaylistItems(access_token) {
    let instance = BragiApiClient.getInstance(access_token)

    return instance.get('/items')
      .then(response => response.data.data)
      .catch(handleError)
}

export function addItemToPlaylist(access_token, item: PlaylistItemType) {
  let instance = BragiApiClient.getInstance(access_token)

  return instance.post('/items', item)
    .then(response =>  response.data.data)
    .catch(handleError)  
}

export function deletePlaylistItem(access_token, item_id) {
  let instance = BragiApiClient.getInstance(access_token)

  return instance.delete(`/items/${item_id}`)
    .then(response => response.status === 204)  
    .catch(handleError)
}

function handleError(error) {
  // TODO: handle error 
  console.log(error)
  if (!!error.request) {
    throw "We were unable to process this request - no server response"
  } else if (!!error.message) {
    throw error.message;
  }
}