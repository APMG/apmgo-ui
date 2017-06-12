import {
    INITIALIZE_PLAYLIST,
    initializePlaylist,
    initializePlaylistItemsSaga,
    fetchingPlaylistItems,
    receivePlaylistItems
} from '../playlist';
import { fetchPlaylistItems } from '../../service/playlist'
import { put, call, takeLatest } from "redux-saga/effects"

describe('initialize playlist saga', () => {

  const
    token = 'SAMPLE_TOKEN',
    workerSaga = initializePlaylistItemsSaga(initializePlaylist(token));

  it('dispatches FETCHING_PLAYLIST_ITEMS action', () => {
    let 
      nextVal = workerSaga.next().value,
      expectedAction = fetchingPlaylistItems();

    expectedAction.receivedAt = expect.any(Number);

    expect(nextVal).toEqual(put(expectedAction))
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