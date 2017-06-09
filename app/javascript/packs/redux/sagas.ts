import { all } from "redux-saga/effects"
import { watchInitializePlaylist } from "./playlist"

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchInitializePlaylist()
  ])
}