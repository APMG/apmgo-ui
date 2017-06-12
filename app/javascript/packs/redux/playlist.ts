import { PlaylistItemType } from './types';
import { addItemToPlaylist, fetchPlaylistItems } from '../service/playlist'

import { put, takeLatest, call } from 'redux-saga/effects'

// Actions
export const RECEIVE_PLAYLIST_ITEMS = 'RECEIVE_PLAYLIST_ITEMS'
export const INITIALIZE_PLAYLIST = 'INITIALIZE_PLAYLIST'
export const FETCHING_PLAYLIST_ITEMS = 'FETCHING_PLAYLIST_ITEMS'
export const ITEM_ADDED_TO_PLAYLIST = 'ITEM_ADDED_TO_PLAYLIST'


class PlaylistStates {
  static readonly FETCHING = 'FETCHING'
  static readonly DEFAULT = 'DEFAULT'
  static readonly ERROR = 'ERROR'
}

// Reducer
export default function reducer(state = {}, action = { type: 'DEFAULT', data: {}, receivedAt: Date.now() }) {
  switch (action.type) {
    case RECEIVE_PLAYLIST_ITEMS:
      return Object.assign({}, {
        data: action.data,
        receivedAt: action.receivedAt,
        status: PlaylistStates.DEFAULT
      })
    case FETCHING_PLAYLIST_ITEMS: 
      return Object.assign({}, {
        status: PlaylistStates.FETCHING
      })
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

// Sagas 

export function* initializePlaylistItemsSaga(action) {
  // Dispatch the "FETCHING_PLAYLIST_ITEMS" action to update the application status
  yield put( fetchingPlaylistItems() )

  // call async fetchPlaylistItems api function.
  // when the promise returns, yield that value from the generator 
  // and also store its value to the playlist variable 
  // (noted bc it was confusing to me that both of those things would happen) 
  let playlist = yield call(fetchPlaylistItems, action.access_token)
  // TODO: wrap this ^^^ in a try/catch block to handle errors

  // Dispatch the RECEIVE_PLAYLIST_ITEMS action with the data from the prior call
  yield put( receivePlaylistItems(playlist) );
}



