import type { PlaylistItemType } from './types';
import { addItemToPlaylist, fetchPlaylistItems, deletePlaylistItem, apiArchivePlaylistItem } from '../service/playlist'
import { ActionType } from './defaults'
import { PAUSE_CLICK, UPDATE_PLAYTIME } from './audio-player'

import { put, takeLatest, call } from 'redux-saga/effects'

// Actions
export const RECEIVE_PLAYLIST_ITEMS : string = 'RECEIVE_PLAYLIST_ITEMS'
export const INITIALIZE_PLAYLIST : string = 'INITIALIZE_PLAYLIST'
export const FETCHING_PLAYLIST_ITEMS : string = 'FETCHING_PLAYLIST_ITEMS'
export const ITEM_ADDED_TO_PLAYLIST : string = 'ITEM_ADDED_TO_PLAYLIST'

export const REMOVING_PLAYLIST_ITEM : string = 'REMOVING_ITEM_FROM_PLAYLIST'
export const REMOVE_PLAYLIST_ITEM : string = 'REMOVE_PLAYLIST_ITEM'
export const PLAYLIST_ITEM_REMOVED : string = 'PLAYLIST_ITEM_REMOVED'

export const ARCHIVING_PLAYLIST_ITEM : string = 'ARCHIVING_PLAYLIST_ITEM'
export const ARCHIVE_PLAYLIST_ITEM : string = 'ARCHIVE_PLAYLIST_ITEM'
export const PLAYLIST_ITEM_ARCHIVED : string = 'PLAYLIST_ITEM_ARCHIVED'

export const PLAYLIST_ERROR_OCCURRED : string = 'PLAYLIST_ERROR_OCCURED'
export const CLEAR_PLAYLIST_ERROR : string = 'CLEAR_PLAYLIST_ERROR'

export const UPDATE_PLAYLIST_ITEM : string = 'UPDATE_PLAYLIST_ITEM'

// Statuses
class PlaylistStatuses {
  ARCHIVING_ITEM : string = 'ARCHIVING_ITEM'
  REMOVING_ITEM : string = 'REMOVING_ITEM'
  FETCHING : string = 'FETCHING'
  DEFAULT : string = 'DEFAULT'
  ERROR : string = 'ERROR'
}

// Reducer
export default function reducer(state : {data: Array<PlaylistItemType>, errorMessage: string} = {data: [], errorMessage: ''}, action : ActionType = new ActionType) {
  switch (action.type) {
    case RECEIVE_PLAYLIST_ITEMS:
      return Object.assign({}, state, {
        data: action.data,
        receivedAt: action.receivedAt,
        status: PlaylistStatuses.DEFAULT
      })

    case FETCHING_PLAYLIST_ITEMS:
      return Object.assign({}, state, {
        status: PlaylistStatuses.FETCHING,
        receivedAt: action.receivedAt
      })

    case REMOVING_PLAYLIST_ITEM:
      return Object.assign({}, state, {
        status: PlaylistStatuses.REMOVING_ITEM
      })

    case REMOVE_PLAYLIST_ITEM:
      return Object.assign({}, state, {
        data: state.data.filter(item => {
          return item.id !== action.item_id
        })
      })

    case PLAYLIST_ITEM_REMOVED:
      return Object.assign({}, state, {
        status: PlaylistStatuses.DEFAULT
      })

    case ARCHIVING_PLAYLIST_ITEM:
      return Object.assign({}, state, {
        status: PlaylistStatuses.ARCHIVING_ITEM
      })

    case ARCHIVE_PLAYLIST_ITEM:
      return Object.assign({}, state, {
        data: state.data.map(item => {
          if (item.id === action.item.id) {
            return Object.assign({}, item, action.item)
          } else {
            return item
          }
        })
      })

    case PLAYLIST_ITEM_ARCHIVED:
      return Object.assign({}, state, {
        status: PlaylistStatuses.DEFAULT
      })

    case PLAYLIST_ERROR_OCCURRED:
      return Object.assign({}, state, {
        errorMessage: action.message
      })

    case CLEAR_PLAYLIST_ERROR:
      let result = Object.assign({}, state);
      delete result.errorMessage;
      return result

    case UPDATE_PLAYLIST_ITEM:
      return Object.assign({}, state, {
        data: state.data.map(item => {
          if (item.id === action.item.id) {
            return Object.assign({}, item, action.item)
          }
          return item;
        })
      })

    case UPDATE_PLAYTIME:
      let updated = Object.assign({}, state, {
        data: state.data.map(item => {
          if (item.id === action.item_id) {
            item.attributes.playtime = action.currentTime
            return {...item}
          } else {
            return item
          }
        })
      })
      return updated

    default: return state
  }
}

// Action creators
export function receivePlaylistItems (data) {
  return {
    type: RECEIVE_PLAYLIST_ITEMS,
    data: data,
    receivedAt: Date.now()
  }
}


export function removingPlaylistItem(item_id) {
  return {
    type: REMOVING_PLAYLIST_ITEM,
    item_id: item_id,
    receivedAt: Date.now()
  }
}

export function removePlaylistItem (access_token, item_id) {
  return {
    type: REMOVE_PLAYLIST_ITEM,
    access_token: access_token,
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
  }
}

export function archivePlaylistItem (access_token, item) {
  return {
    type: ARCHIVE_PLAYLIST_ITEM,
    access_token: access_token,
    item: item
  }
}

export function playlistItemArchived(item) {
  return {
    type: PLAYLIST_ITEM_ARCHIVED,
    item: item
  }
}

export function addedItemToPlaylist(json) {
  return {
    type: ITEM_ADDED_TO_PLAYLIST,
    data: json.data,
    receivedAt: Date.now()
  }
}

export function initializePlaylist(access_token) {
  return {
    type: INITIALIZE_PLAYLIST,
    access_token: access_token,
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

export function updatePlaylistItem(item) {
  return {
    type: UPDATE_PLAYLIST_ITEM,
    item: item
  }
}

// Sagas

export function* initializePlaylistItemsSaga(action) {
  // Dispatch the "FETCHING_PLAYLIST_ITEMS" action to update the application status
  yield put( fetchingPlaylistItems() )

  try {
    // call async fetchPlaylistItems api function.
    // when the promise returns, yield that value from the generator
    // and also store its value to the playlist variable
    // (noted bc it was confusing to me that both of those things would happen)
    let playlist = yield call( fetchPlaylistItems, action.access_token )

    // Dispatch the RECEIVE_PLAYLIST_ITEMS action with the data from the prior call
    yield put( receivePlaylistItems(playlist) );
  } catch (e) {
    yield put( playlistErrorOccured(e.message) ) ;
  }
}

export function* removePlaylistItemSaga(action) {
  yield put ( removingPlaylistItem(action.item_id) );

  try {
    yield call( deletePlaylistItem, action.access_token, action.item_id )
    yield put ( playlistItemRemoved( action.item_id ) )
  } catch (e) {
    yield put( playlistErrorOccured( e.message ) )
  }
}

export function* archivePlaylistItemSaga(action) {
  yield put ( archivingPlaylistItem(action.item) );

  try {
    let itemResult = yield call( apiArchivePlaylistItem, action.access_token, action.item )
    yield put ( playlistItemArchived( itemResult ) )
  } catch (e) {
    yield put( playlistErrorOccured( e.message ) )
  }
}
