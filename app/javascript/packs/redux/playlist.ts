import { PlaylistItemType } from './types';
import axios from 'axios'
import { put, takeEvery, call } from 'redux-saga/effects'

import { addItemToPlaylist, fetchPlaylistItems } from '../service/playlist'

// Actions
export const RECEIVE_PLAYLIST_ITEMS = 'RECEIVE_PLAYLIST_ITEMS'
export const INITIALIZE_PLAYLIST = 'INITIALIZE_PLAYLIST'
export const ITEM_ADDED_TO_PLAYLIST = 'ITEM_ADDED_TO_PLAYLIST'
export const FETCHING_PLAYLIST_ITEMS = 'FETCHING_PLAYLIST_ITEMS'

// Reducer
export default function reducer(state = {}, action = { type: 'DEFAULT', data: {}, receivedAt: Date.now() }) {
  switch (action.type) {
    case RECEIVE_PLAYLIST_ITEMS:
      return Object.assign({}, {
        data: action.data,
        receivedAt: action.receivedAt
      })
    default: return state
  }
}

// Action creators
export function receivePlaylistItems (json) {
  return {
    type: RECEIVE_PLAYLIST_ITEMS,
    data: json.data,
    receivedAt: Date.now()
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

// playlist init worker saga
export function* initializePlaylistItemsSaga(action) {
  yield put(fetchingPlaylistItems())
  let playlist = yield call(fetchPlaylistItems, action.access_token)
  yield put( receivePlaylistItems(playlist) );
}

// playlist init watcher saga
export function* watchInitializePlaylist() {
  yield takeEvery(INITIALIZE_PLAYLIST, initializePlaylistItemsSaga)
}



