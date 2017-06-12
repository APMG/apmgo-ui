import { all } from "redux-saga/effects"
import { watchInitializePlaylist } from "./playlist"

// Take all the individual sagas and compose them into one root saga to bootstrap onto the saga middleware
export default function* rootSaga() {
  yield all([
    watchInitializePlaylist()
  ])
}