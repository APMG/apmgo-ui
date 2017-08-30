import { all, takeEvery } from "redux-saga/effects"
import {
  INITIALIZE_PLAYLIST,
  REMOVE_PLAYLIST_ITEM,
  ARCHIVE_PLAYLIST_ITEM,
  initializePlaylistItemsSaga,
  removePlaylistItemSaga,
  archivePlaylistItemSaga,
  movePlaylistItemSaga
} from "./playlist"

import { PLAYLIST_ITEM_MOVED } from './data'

// Take all the individual sagas and compose them into one root saga to bootstrap onto the saga middleware
export default function* rootSaga() {
  yield all([
    takeEvery(INITIALIZE_PLAYLIST, initializePlaylistItemsSaga),
    takeEvery(REMOVE_PLAYLIST_ITEM, removePlaylistItemSaga),
    takeEvery(ARCHIVE_PLAYLIST_ITEM, archivePlaylistItemSaga),
    takeEvery(PLAYLIST_ITEM_MOVED, movePlaylistItemSaga)
  ])
}
