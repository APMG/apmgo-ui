import { BragiApiClient } from "./api";
import { PlaylistItemType } from '../redux/types'
import apm_account from './apm-account'

export function fetchPlaylistItems() : Promise {
    let instance: BragiApiClient = BragiApiClient.getInstance()

    return instance.get('/items')
      .then(response => response.data.data)
      .catch(handleError)
}

export function addItemToPlaylist(item: PlaylistItemType) {
  let instance = BragiApiClient.getInstance()

  return instance.post('/items', item)
    .then(response =>  response.data.data)
    .catch(handleError)
}

export function deletePlaylistItem(item_id) {
  let instance = BragiApiClient.getInstance()
  return instance.delete(`/items/${item_id}`)
    .then(response => response.status === 204)
    .catch(handleError)
}

export async function apiArchivePlaylistItem(item: {}) : Promise<boolean> {
  item.attributes.status = "played"
  item.attributes.finished = (new Date().toString())
  let responseCode = await updatePlaylistItem(item)
    if (responseCode === 204) {
      return item
    }
    throw Error("Could not update item")
}

function updatePlaylistItem(item: PlaylistItemType) {
  let instance = BragiApiClient.getInstance()

  return instance.put(`/items/${item.id}`, {data: item})
    .then(response => response.status)
    .catch(handleError)
}

function handleError(error) {
  // TODO: handle error
  console.error(error)
  if (error.request) {
    throw "We were unable to process this request"
  } else if (error.message) {
    throw error.message;
  }
}