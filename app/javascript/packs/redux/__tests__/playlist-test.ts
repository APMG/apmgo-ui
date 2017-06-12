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

    beforeEach(function() {
      moxios.install();
    })

    afterEach(function() {
      moxios.uninstall();
    });

    it('Fetches playlist items', function() {
      let payload = 'SAMPLE_DATA';

      moxios.stubRequest(/.*\/items/, {
        status: 200,
        response: { 
          data: { 
            data: payload 
          } 
        }
      })
  
      fetchPlaylistItems('SAMPLE_TOKEN')
        .then(result => expect(result).toEqual(payload))
    })

    it('Deletes a playlist item', function() {

      let returnStatus = 204

      moxios.stubOnce('DELETE', /.*\/items\/d+/, {
        status: returnStatus
      })

      deletePlaylistItem(12345)
      .then(response => expect(response).toEqual(returnStatus));
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
    item_id = 12345, 
    token = 'SAMPLE_TOKEN',
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