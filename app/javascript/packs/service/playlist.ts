import { BragiApiClient } from "./api";
import { PlaylistItemType } from '../redux/types'

export function fetchPlaylistItems(access_token) {
    let instance = BragiApiClient.getInstance(access_token);
    return instance.get('/items')
      .then(function (response) {
        return response.data.data
      })
      .catch(function (error) {
        // TODO: Error handling
        console.log(error)
    })
}

export function addItemToPlaylist(access_token, item: PlaylistItemType) {
  var instance = BragiApiClient.getInstance(access_token);

  return instance.post('/items', item)
    .then(response =>  response.data.data)
    .catch(function (error) {
      // TODO: Error handling
      console.log(error)
    })  
}
