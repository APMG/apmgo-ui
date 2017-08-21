import type { PlaylistItemType } from './types';
import { addItemToPlaylist, fetchPlaylistItems, deletePlaylistItem, apiArchivePlaylistItem } from '../service/playlist'
import { ActionType } from './defaults'
import { PAUSE_CLICK, UPDATE_PLAYTIME } from './audio-player'
import {
  fetchingPlaylistItems,
  removingPlaylistItem,
  playlistErrorOccured,
  archivingPlaylistItem,
  playlistItemRemoved,
  playlistItemArchived,
  PLAYLIST_ITEM_ARCHIVED,
  PLAYLIST_ITEM_REMOVED
} from './data'

import { put, takeLatest, call } from 'redux-saga/effects'

// Actions
export const RECEIVE_PLAYLIST_ITEMS : string = 'RECEIVE_PLAYLIST_ITEMS'
export const INITIALIZE_PLAYLIST : string = 'INITIALIZE_PLAYLIST'
export const REMOVE_PLAYLIST_ITEM : string = 'REMOVE_PLAYLIST_ITEM'
export const ARCHIVE_PLAYLIST_ITEM : string = 'ARCHIVE_PLAYLIST_ITEM'
export const UPDATE_PLAYLIST_ITEM : string = 'UPDATE_PLAYLIST_ITEM'

// Reducer
export default function reducer(playlistState : Array<PlaylistItemType> = [], action : ActionType = new ActionType) {
  switch (action.type) {
    case RECEIVE_PLAYLIST_ITEMS:
      return action.data

    case PLAYLIST_ITEM_REMOVED:
    case PLAYLIST_ITEM_ARCHIVED:
      let result = playlistState.filter(item => item.id !== action.item.id)
      return result

    case UPDATE_PLAYLIST_ITEM:
      return playlistState.map(item => {
        if (item.id === action.item.id) {
          return {...item, ...action.item}
        }
        return item;
      })

    case UPDATE_PLAYTIME:
      return playlistState.map(item => {
        if (item.id === action.item_id) {
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
export function receivePlaylistItems (data) {
  return {
    type: RECEIVE_PLAYLIST_ITEMS,
    data: data,
    receivedAt: Date.now()
  }
}

export function removePlaylistItem (item_id) {
  return {
    type: REMOVE_PLAYLIST_ITEM,
    item_id: item_id,
    receivedAt: Date.now()
  }
}

export function archivePlaylistItem (item) {
  return {
    type: ARCHIVE_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
  }
}

export function initializePlaylist() {
  return {
    type: INITIALIZE_PLAYLIST,
    receivedAt: Date.now()
  }
}

export function updatePlaylistItem(item) {
  return {
    type: UPDATE_PLAYLIST_ITEM,
    item: item,
    receivedAt: Date.now()
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
    let playlist = yield call(fetchPlaylistItems)

    // Dispatch the RECEIVE_PLAYLIST_ITEMS action with the data from the prior call
    yield put( receivePlaylistItems(playlist) );
  } catch (e) {
    yield put( playlistErrorOccured(e.message) ) ;
  }
}

export function* removePlaylistItemSaga(action) {
  yield put ( removingPlaylistItem(action.item_id) );
  try {
    yield call( deletePlaylistItem, action.item_id )
    yield put ( playlistItemRemoved( action.item_id ) )
  } catch (e) {
    yield put( playlistErrorOccured( e.message ) )
  }
}

export function* archivePlaylistItemSaga(action) {
  yield put ( archivingPlaylistItem(action.item) );

  try {
    let itemResult = yield call(apiArchivePlaylistItem, action.item)
    yield put ( playlistItemArchived( itemResult ) )
  } catch (e) {
    yield put( playlistErrorOccured( e.message ) )
  }
}
