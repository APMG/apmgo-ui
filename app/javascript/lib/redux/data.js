import type { PlaylistItemType } from './types';
import { addItemToPlaylist, fetchPlaylistItems, deletePlaylistItem } from '../service/playlist'
import { ActionType } from './defaults'
import { PAUSE_CLICK, UPDATE_PLAYTIME } from './audio-player'
import {
  INITIALIZE_PLAYLIST,
  RECEIVE_PLAYLIST_ITEMS,
  REMOVE_PLAYLIST_ITEM,
  ARCHIVE_PLAYLIST_ITEM,
  UPDATE_PLAYLIST_ITEM
} from './playlist'
import { put, takeLatest, call } from 'redux-saga/effects'

// Actions
export const FETCHING_PLAYLIST_ITEMS : string = 'FETCHING_PLAYLIST_ITEMS'
export const REMOVING_PLAYLIST_ITEM : string = 'REMOVING_ITEM_FROM_PLAYLIST'
export const PLAYLIST_ITEM_REMOVED : string = 'PLAYLIST_ITEM_REMOVED'
export const ARCHIVING_PLAYLIST_ITEM : string = 'ARCHIVING_PLAYLIST_ITEM'
export const PLAYLIST_ITEM_ARCHIVED : string = 'PLAYLIST_ITEM_ARCHIVED'
export const PLAYLIST_ERROR_OCCURRED : string = 'PLAYLIST_ERROR_OCCURED'
export const CLEAR_PLAYLIST_ERROR : string = 'CLEAR_PLAYLIST_ERROR'
export const UPDATING_PLAYLIST_ITEM : string = 'UPDATING_PLAYLIST_ITEM'
export const PLAYLIST_ITEM_UPDATED : string = 'PLAYLIST_ITEM_UPDATED'
export const PLAYLIST_ITEM_MOVED : string = 'PLAYLIST_ITEM_MOVED'
// Statuses
class PlaylistStatuses {
  ARCHIVING_ITEM : string = 'ARCHIVING_ITEM'
  REMOVING_ITEM : string = 'REMOVING_ITEM'
  UPDATING_ITEM : string = 'MOVING_ITEM'
  FETCHING : string = 'FETCHING'
  DEFAULT : string = 'DEFAULT'
  ERROR : string = 'ERROR'
}

type DataReducerState = {
  status: string,
  receivedAt?: number,
  errorMessage?: string
}

function updateStatus(state: DataReducerState, newStatus, receivedAt) {
  return {
    ...state,
    status: receivedAt,
    receivedAt: receivedAt
  }
}

// Reducer
export default function reducer(dataState: DataReducerState = {status: PlaylistStatuses.DEFAULT}, action : ActionType = new ActionType) {
  switch (action.type) {

    case INITIALIZE_PLAYLIST:
      return {
        ...dataState,
        receivedAt: action.receivedAt
      }

    case FETCHING_PLAYLIST_ITEMS:
      return updateStatus(
        dataState,
        PlaylistStatuses.FETCHING,
        action.receivedAt
      )

    case RECEIVE_PLAYLIST_ITEMS:
      return updateStatus(
        dataState,
        PlaylistStatuses.DEFAULT,
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
        PlaylistStatuses.REMOVING_ITEM,
        action.receivedAt
      )

    case PLAYLIST_ITEM_REMOVED:
      return updateStatus(
        dataState,
        PlaylistStatuses.DEFAULT,
        action.receivedAt
      )

    case ARCHIVING_PLAYLIST_ITEM:
      return updateStatus(
        dataState,
        PlaylistStatuses.ARCHIVING_ITEM,
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
        PlaylistStatuses.DEFAULT,
        action.receivedAt
      )

    case PLAYLIST_ERROR_OCCURRED:
      return {
        ...dataState,
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
        PlaylistStatuses.UPDATING_ITEM,
        action.receivedAt
      )
    }

    default: return dataState
  }
}

export function removingPlaylistItem(item_id) {
  return {
    type: REMOVING_PLAYLIST_ITEM,
    item_id: item_id,
    receivedAt: Date.now()
  }
}

export function playlistItemRemoved(item_id) {
  return {
    type: PLAYLIST_ITEM_REMOVED,
    item_id: item_id,
    receivedAt: Date.now()
  }
}

// Archiving
export function archivingPlaylistItem(item) {
  return {
    type: ARCHIVING_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
  }
}

export function playlistItemArchived(item) {
  return {
    type: PLAYLIST_ITEM_ARCHIVED,
    item: item,
    receivedAt: Date.now()
  }
}

export function fetchingPlaylistItems() {
  return {
    type: FETCHING_PLAYLIST_ITEMS,
    receivedAt: Date.now()
  }
}

export function playlistErrorOccured(message) {
  return {
    type: PLAYLIST_ERROR_OCCURRED,
    message: message,
    receivedAt: Date.now()
  }
}

export function clearPlaylistError() {
  return {
    type: CLEAR_PLAYLIST_ERROR,
    receivedAt: Date.now()
  }
}

export function updatingPlaylistItem(item: PlaylistItemType) {
  return {
    type: UPDATING_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
  }
}

export function playlistItemMoved(item: PlaylistItemType, toAfter) {
  return {
    type: PLAYLIST_ITEM_MOVED,
    item: item,
    toAfter: toAfter,
    receivedAt: Date.now()
  }
}

export function playlistItemUpdated(item: PlaylistItemType) {
  return {
    type: PLAYLIST_ITEM_UPDATED,
    item: item,
    receivedAt: Date.now()
  }
}
