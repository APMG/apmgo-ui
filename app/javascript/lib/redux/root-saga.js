// @flow
import { all, takeEvery } from 'redux-saga/effects'
import {
  REMOVE_PLAYLIST_ITEM,
  ARCHIVE_PLAYLIST_ITEM
} from './playlist'

import {
  TRACK_ENDED,
  trackEndedSaga
} from './audio-player'

import { PLAYLIST_ITEM_MOVED,
  INITIALIZE_PLAYLIST,
  initializePlaylistItemsSaga,
  removePlaylistItemSaga,
  archivePlaylistItemSaga,
  movePlaylistItemSaga
} from './data'

// Take all the individual sagas and compose them into one root saga to bootstrap onto the saga middleware
export default function * rootSaga (): Generator<any, any, any> {
  yield all([
    takeEvery(INITIALIZE_PLAYLIST, initializePlaylistItemsSaga),
    takeEvery(REMOVE_PLAYLIST_ITEM, removePlaylistItemSaga),
    takeEvery(ARCHIVE_PLAYLIST_ITEM, archivePlaylistItemSaga),
    takeEvery(PLAYLIST_ITEM_MOVED, movePlaylistItemSaga),
    takeEvery(TRACK_ENDED, trackEndedSaga)
  ])
}
