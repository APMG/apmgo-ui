// @flow
import type { PlaylistItemType } from './types'
import { ActionType } from './defaults'
import { UPDATE_PLAYTIME } from './audio-player'
import {
  PLAYLIST_ITEM_REMOVED,
  PLAYLIST_ITEM_ARCHIVED
} from './data'

// Actions
export const RECEIVE_PLAYLIST_ITEMS : string = 'apmgo/playlist/RECEIVE_PLAYLIST_ITEMS'
export const REMOVE_PLAYLIST_ITEM : string = 'apmgo/playlist/REMOVE_PLAYLIST_ITEM'
export const ARCHIVE_PLAYLIST_ITEM : string = 'apmgo/playlist/ARCHIVE_PLAYLIST_ITEM'
export const UPDATE_PLAYLIST_ITEM : string = 'apmgo/playlist/UPDATE_PLAYLIST_ITEM'
export const MOVE_PLAYLIST_ITEM : string = 'apmgo/playlist/MOVE_PLAYLIST_ITEM'
export const ADD_PLAYLIST_ITEM : string = 'apmgo/playlist/ADD_PLAYLIST_ITEM'

// Reducer
export default function reducer (playlistState: Array<PlaylistItemType> = [], action: ActionType = new ActionType()) {
  switch (action.type) {
    case RECEIVE_PLAYLIST_ITEMS:
      return action.data

    case PLAYLIST_ITEM_ARCHIVED:
    case PLAYLIST_ITEM_REMOVED:
      return playlistState.filter(item => item.id !== action.itemId)

    case UPDATE_PLAYLIST_ITEM:
      return playlistState.map(item => {
        if (item.id === action.item.id) {
          return {...item, ...action.item}
        }
        return item
      })

    case MOVE_PLAYLIST_ITEM:
      return doMove(
        playlistState,
        action.from,
        action.to
      )

    case ADD_PLAYLIST_ITEM:
      playlistState.push(action.item)
      return playlistState.slice()

    case UPDATE_PLAYTIME:
      return playlistState.map(item => {
        if (item.id === action.itemId) {
          item.attributes.playtime = action.currentTime
          return {...item}
        } else {
          return item
        }
      })

    default: return playlistState
  }
}

// Action creators
export function receivePlaylistItems (data: Array<PlaylistItemType>) {
  return {
    type: RECEIVE_PLAYLIST_ITEMS,
    data: data,
    receivedAt: Date.now()
  }
}

export function removePlaylistItem (itemId: number) {
  return {
    type: REMOVE_PLAYLIST_ITEM,
    itemId: itemId,
    receivedAt: Date.now()
  }
}

export function addPlaylistItem (item: PlaylistItemType) {
  return {
    type: ADD_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
  }
}

export function archivePlaylistItem (item: PlaylistItemType) {
  return {
    type: ARCHIVE_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
  }
}

export function movePlaylistItem (from: number, to: number) {
  return {
    type: MOVE_PLAYLIST_ITEM,
    from: from,
    to: to,
    receivedAt: Date.now()
  }
}

function arrayMove (array: Array<any>, from: number, to: number) {
  let item = array.splice(from, 1)[0]
  array.splice(to, 0, item)
  return array.slice()
}

function doMove (playlist: Array<PlaylistItemType>, from: number, to: number) {
  playlist = arrayMove(
    playlist,
    from,
    to
  )
  let after = playlist[to - 1]

  playlist[to].attributes.after = after ? after.id : null

  let before = playlist[to + 1]
  if (before) {
    playlist[to + 1].attributes.after = playlist[to].id
  }

  return playlist
}
