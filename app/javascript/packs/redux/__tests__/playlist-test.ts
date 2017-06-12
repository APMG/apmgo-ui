import {
    INITIALIZE_PLAYLIST,
    initializePlaylist,
    initializePlaylistItemsSaga,
    watchInitializePlaylist,
    fetchingPlaylistItems,
    receivePlaylistItems
} from '../playlist';
import { fetchPlaylistItems } from '../../service/playlist'
import { put, call, takeLatest } from "redux-saga/effects"

describe('initialize playlist saga', () => {

  const
    token = 'SAMPLE_TOKEN',
    watcherSaga = watchInitializePlaylist(), 
    workerSaga = initializePlaylistItemsSaga(initializePlaylist(token));

  it('waits to respond to INITIALIZE_PLAYLIST action', () => {
    let 
      nextVal = watcherSaga.next().value,
      expected = takeLatest(INITIALIZE_PLAYLIST, initializePlaylistItemsSaga);

    expect(nextVal).toEqual(expected)
    expect(watcherSaga.next().done).toBeTruthy()
  });

  it('dispatches FETCHING_PLAYLIST_ITEMS action', () => {
    let 
      nextVal = workerSaga.next().value,
      action = fetchingPlaylistItems(),
      expected = put(action);

    expect(nextVal).toEqual(expected)
  })

  it('receives playlist', () => {
    let
      nextVal = workerSaga.next().value,
      expected = call(fetchPlaylistItems, token)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches RECEIVE_PLAYLIST_ITEMS action', () => {
    let 
      mockResponse = { data: 'json' },
      nextVal = workerSaga.next(mockResponse).value,
      action = receivePlaylistItems(mockResponse),
      expected = put(action);

      expect(nextVal).toEqual(expected)
      expect(workerSaga.next().done).toBeTruthy()
  })

})