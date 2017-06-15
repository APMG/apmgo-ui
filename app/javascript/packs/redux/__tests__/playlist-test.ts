import {
    fetchingPlaylistItems,
    initializePlaylist,
    initializePlaylistItemsSaga,
    receivePlaylistItems,
    removePlaylistItem,
    removePlaylistItemSaga,
    removingPlaylistItem,
    playlistItemRemoved
} from '../playlist';
import { fetchPlaylistItems, deletePlaylistItem } from '../../service/playlist'
import { put, call, takeLatest } from "redux-saga/effects"
import * as moxios from 'moxios'
import configureMockStore from 'redux-mock-store'

describe('Playlist API suite', () => {
  const token = 'SAMPLE_TOKEN'

  beforeEach(function() {
    moxios.install()
  })

  afterEach(function() {
    moxios.uninstall()
  })

  it('Fetches playlist items', async () => {
    expect.assertions(1)
    let payload = 'SAMPLE_DATA'

    moxios.stubOnce('GET', /.*\/items/, {
      status: 200,
      response: { 
        data: { 
          data: payload 
        } 
      }
    })

    let result = await fetchPlaylistItems(token)
    expect(result.data).toEqual(payload)
  })

  it('Deletes a playlist item', async () => {
    expect.assertions(1)
    let returnStatus = 204

    moxios.stubOnce('DELETE', /.*\/items\/\d+/, {
      status: returnStatus
    })

    let result = await deletePlaylistItem(token, 12345)
    expect(result).toEqual(true)
  })
})

describe('initialize playlist saga', () => {

  const
    token = 'SAMPLE_TOKEN', 
    saga = initializePlaylistItemsSaga(initializePlaylist(token));

  it('dispatches FETCHING_PLAYLIST_ITEMS action', () => {
    let 
      nextVal = saga.next().value,
      expectedAction = fetchingPlaylistItems();

    expectedAction.receivedAt = expect.any(Number);

    expect(nextVal).toEqual(put(expectedAction))
  })

  it('receives playlist', () => {
    let
      nextVal = saga.next().value,
      expected = call(fetchPlaylistItems, token)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches RECEIVE_PLAYLIST_ITEMS action', () => {
    let 
      mockResponse = { data: 'json' },
      nextVal = saga.next(mockResponse).value,
      expectedAction = receivePlaylistItems(mockResponse);

      expectedAction.receivedAt = expect.any(Number);

      expect(nextVal).toEqual(put(expectedAction))
      expect(saga.next().done).toBeTruthy()
  })

})



describe('remove playlist item saga', () => {

  const
    token = 'SAMPLE_TOKEN',
    item_id = 12345, 
    saga = removePlaylistItemSaga(removePlaylistItem(token, item_id))

  it('dispatches REMOVING_PLAYLIST_ITEM action', function() {
    let 
      nextVal = saga.next().value,
      expectedAction = removingPlaylistItem(item_id);

    expectedAction.receivedAt = expect.any(Number)

    expect(nextVal).toEqual(put(expectedAction))
  })

  it('deletes item', function() {
    let
      nextVal = saga.next().value,
      expected = call(deletePlaylistItem, token, item_id)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches PLAYLIST_ITEM_REMOVED action', function() {
    let 
      nextVal = saga.next().value,
      expectedAction = playlistItemRemoved(item_id)

      expectedAction.receivedAt = expect.any(Number)

      expect(nextVal).toEqual(put(expectedAction))
  })
})