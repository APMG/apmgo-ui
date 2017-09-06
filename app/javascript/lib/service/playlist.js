// @flow
import { BragiApiClient } from './api'
import { PlaylistItemType } from '../redux/types'

export function fetchPlaylistItems (): Promise<*> {
  let instance = BragiApiClient.getInstance()

  return instance.get('/items?filter[status][]=playing&filter[status][]=unplayed')
    .then(response => response.data.data)
    .catch(handleError)
}

export function deletePlaylistItem (itemId: number) {
  let instance = BragiApiClient.getInstance()
  return instance.delete(`/items/${itemId}`)
    .then(response => response.status === 204)
    .catch(handleError)
}

export async function apiMovePlaylistItem (item: PlaylistItemType, toAfter: number): Promise<*> {
  item.attributes.after = toAfter
  let responseCode = await updatePlaylistItem(item)

  if (responseCode === 204) {
    return item
  }
  throw Error('Could not move item')
}

export function updatePlaylistItem (item: PlaylistItemType) {
  let instance = BragiApiClient.getInstance()

  return instance.put(`/items/${item.id}`, {data: item})
    .then(response => response.status)
    .catch(handleError)
}

function handleError (error) {
  // TODO: handle error
  console.error(error)
  if (error.request) {
    throw new Error('We were unable to process this request')
  } else if (error.message) {
    throw new Error(error.message)
  }
}
