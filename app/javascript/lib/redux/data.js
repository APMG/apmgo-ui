// @flow
import type { PlaylistItemType } from './types'
import { put, call } from 'redux-saga/effects'

import { ActionType } from './defaults'
import { fetchPlaylistItems, deletePlaylistItem, updatePlaylistItem } from '../service/playlist'
import {
  receivePlaylistItems,
  RECEIVE_PLAYLIST_ITEMS,
  REMOVE_PLAYLIST_ITEM,
  ARCHIVE_PLAYLIST_ITEM,
  UPDATE_PLAYLIST_ITEM
} from './playlist'

// Actions
export const INITIALIZE_PLAYLIST : string = 'bragi/data/INITIALIZE_PLAYLIST'
export const FETCHING_PLAYLIST_ITEMS : string = 'bragi/data/FETCHING_PLAYLIST_ITEMS'
export const REMOVING_PLAYLIST_ITEM : string = 'bragi/data/REMOVING_ITEM_FROM_PLAYLIST'
export const PLAYLIST_ITEM_REMOVED : string = 'bragi/data/PLAYLIST_ITEM_REMOVED'
export const ARCHIVING_PLAYLIST_ITEM : string = 'bragi/data/ARCHIVING_PLAYLIST_ITEM'
export const PLAYLIST_ITEM_ARCHIVED : string = 'bragi/data/PLAYLIST_ITEM_ARCHIVED'
export const PLAYLIST_ERROR_OCCURRED : string = 'bragi/data/PLAYLIST_ERROR_OCCURED'
export const CLEAR_PLAYLIST_ERROR : string = 'bragi/data/CLEAR_PLAYLIST_ERROR'
export const UPDATING_PLAYLIST_ITEM : string = 'bragi/data/UPDATING_PLAYLIST_ITEM'
export const PLAYLIST_ITEM_UPDATED : string = 'bragi/data/PLAYLIST_ITEM_UPDATED'
export const PLAYLIST_ITEM_MOVED : string = 'bragi/data/PLAYLIST_ITEM_MOVED'

// Statuses
const ARCHIVING_ITEM_STATUS: string = 'ARCHIVING_ITEM'
const REMOVING_ITEM_STATUS: string = 'REMOVING_ITEM'
const UPDATING_ITEM_STATUS: string = 'MOVING_ITEM'
const FETCHING_STATUS: string = 'FETCHING'
const DEFAULT_STATUS: string = 'DEFAULT'
const ERROR_STATUS: string = 'ERROR'

type DataReducerState = {
  status: string,
  receivedAt?: number,
  errorMessage?: string
}

function updateStatus (state: DataReducerState, newStatus, receivedAt) {
  return {
    ...state,
    status: receivedAt,
    receivedAt: receivedAt
  }
}

// Reducer
export default function reducer (dataState: DataReducerState = {status: DEFAULT_STATUS}, action: ActionType = new ActionType()) {
  switch (action.type) {
    case INITIALIZE_PLAYLIST:
      return {
        ...dataState,
        receivedAt: action.receivedAt
      }

    case FETCHING_PLAYLIST_ITEMS:
      return updateStatus(
        dataState,
        FETCHING_STATUS,
        action.receivedAt
      )

    case RECEIVE_PLAYLIST_ITEMS:
      return updateStatus(
        dataState,
        DEFAULT_STATUS,
        action.receivedAt
      )

    case REMOVE_PLAYLIST_ITEM:
      return {
        ...dataState,
        receivedAt: action.receivedAt
      }

    case REMOVING_PLAYLIST_ITEM:
      return updateStatus(
        dataState,
        REMOVING_ITEM_STATUS,
        action.receivedAt
      )

    case PLAYLIST_ITEM_REMOVED:
      return updateStatus(
        dataState,
        DEFAULT_STATUS,
        action.receivedAt
      )

    case ARCHIVING_PLAYLIST_ITEM:
      return updateStatus(
        dataState,
        ARCHIVING_ITEM_STATUS,
        action.receivedAt
      )

    case ARCHIVE_PLAYLIST_ITEM:
      return {
        ...dataState,
        receivedAt: action.receivedAt
      }

    case PLAYLIST_ITEM_ARCHIVED:
      return updateStatus(
        dataState,
        DEFAULT_STATUS,
        action.receivedAt
      )

    case PLAYLIST_ERROR_OCCURRED:
      return {
        ...dataState,
        status: ERROR_STATUS,
        errorMessage: action.message,
        receivedAt: action.receivedAt
      }

    case CLEAR_PLAYLIST_ERROR:
      return {
        ...dataState,
        errorMessage: null,
        receivedAt: action.receivedAt
      }

    case UPDATE_PLAYLIST_ITEM: {
      return {
        ...dataState,
        receivedAt: action.receivedAt
      }
    }

    case UPDATING_PLAYLIST_ITEM: {
      return updateStatus(
        dataState,
        UPDATING_ITEM_STATUS,
        action.receivedAt
      )
    }

    default: return dataState
  }
}

export function initializePlaylist () {
  return {
    type: INITIALIZE_PLAYLIST,
    receivedAt: Date.now()
  }
}

export function removingPlaylistItem (itemId: number) {
  return {
    type: REMOVING_PLAYLIST_ITEM,
    itemId: itemId,
    receivedAt: Date.now()
  }
}

export function playlistItemRemoved (itemId: number) {
  return {
    type: PLAYLIST_ITEM_REMOVED,
    itemId: itemId,
    receivedAt: Date.now()
  }
}

// Archiving
export function archivingPlaylistItem (item: PlaylistItemType) {
  return {
    type: ARCHIVING_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
  }
}

export function playlistItemArchived (item: PlaylistItemType) {
  return {
    type: PLAYLIST_ITEM_ARCHIVED,
    item: item,
    receivedAt: Date.now()
  }
}

export function fetchingPlaylistItems () {
  return {
    type: FETCHING_PLAYLIST_ITEMS,
    receivedAt: Date.now()
  }
}

export function playlistErrorOccured (message: string) {
  return {
    type: PLAYLIST_ERROR_OCCURRED,
    message: message,
    receivedAt: Date.now()
  }
}

export function clearPlaylistError () {
  return {
    type: CLEAR_PLAYLIST_ERROR,
    receivedAt: Date.now()
  }
}

export function updatingPlaylistItem (item: PlaylistItemType) {
  return {
    type: UPDATING_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
  }
}

export function playlistItemMoved (item: PlaylistItemType, toAfter: number | null) {
  return {
    type: PLAYLIST_ITEM_MOVED,
    item: item,
    toAfter: toAfter,
    receivedAt: Date.now()
  }
}

export function playlistItemUpdated (item: PlaylistItemType) {
  return {
    type: PLAYLIST_ITEM_UPDATED,
    item: item,
    receivedAt: Date.now()
  }
}

// Sagas

export function * initializePlaylistItemsSaga (action: any): Generator<any, any, any> {
  // Dispatch the "FETCHING_PLAYLIST_ITEMS" action to update the application status
  yield put(fetchingPlaylistItems())

  try {
    // call async fetchPlaylistItems api function.
    // when the promise returns, yield that value from the generator
    // and also store its value to the playlist variable
    // (noted bc it was confusing to me that both of those things would happen)
    let playlist = yield call(fetchPlaylistItems)

    // Dispatch the RECEIVE_PLAYLIST_ITEMS action with the data from the prior call
    yield put(receivePlaylistItems(playlist))
  } catch (e) {
    yield put(playlistErrorOccured(e.message))
  }
}

export function * removePlaylistItemSaga (action: any): Generator<any, any, any> {
  yield put(removingPlaylistItem(action.itemId))
  try {
    yield call(deletePlaylistItem, action.itemId)
    yield put(playlistItemRemoved(action.itemId))
  } catch (e) {
    yield put(playlistErrorOccured(e.message))
  }
}

export function * archivePlaylistItemSaga (action: any): Generator<any, any, any> {
  yield put(archivingPlaylistItem(action.item))

  try {
    action.item.attributes.status = 'played'
    action.item.attributes.finished = (new Date().toString())

    yield call(updatePlaylistItem, action.item)
    yield put(playlistItemArchived(action.item))
  } catch (e) {
    yield put(playlistErrorOccured(e.message))
  }
}

export function * movePlaylistItemSaga (action: any): Generator<any, any, any> {
  yield put(updatingPlaylistItem(action.item))

  try {
    action.item.attributes.after_id = action.toAfter
    yield call(updatePlaylistItem, action.item)
  } catch (e) {
    yield put(playlistErrorOccured(e.message))
  }
}
