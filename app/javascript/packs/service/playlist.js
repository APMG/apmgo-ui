import { BragiApiClient } from "./api";
import { PlaylistItemType } from '../redux/types'

export function fetchPlaylistItems(access_token: string) : Promise {
    let instance: BragiApiClient = BragiApiClient.getInstance(access_token)

    return instance.get('/items')
      .then(response => response.data.data)
      .catch(handleError)
}

export function addItemToPlaylist(access_token: string, item: PlaylistItemType) {
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

export async function apiArchivePlaylistItem(access_token: string, item: {}) : Promise<boolean> {
  item = {
    ...item,
    attributes: {
      ...item.attributes,
      status: "played",
      finished: new Date().toString()
    }
  }
  let responseCode = await updatePlaylistItem(access_token, item)
  if (responseCode === 204) {
    return item
  }
  throw Error("Could not update item")
}

function updatePlaylistItem(access_token, item: PlaylistItemType) {
  let instance = BragiApiClient.getInstance(access_token)

  return instance.put(`/items/${item.id}`, item)
    .then(response => response.status)
    .catch(handleError)
}

function handleError(error) {
  // TODO: handle error
  console.log(error)
  if (!!error.request) {
    throw "We were unable to process this request"
  } else if (!!error.message) {
    throw error.message;
  }
}
