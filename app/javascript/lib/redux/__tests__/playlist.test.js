import {
    initializePlaylist,
    initializePlaylistItemsSaga,
    receivePlaylistItems,
    removePlaylistItem,
    removePlaylistItemSaga,

    archivePlaylistItemSaga,
    archivePlaylistItem
} from '../playlist';
import {
  fetchingPlaylistItems,
  removingPlaylistItem,
  playlistItemRemoved,
  archivingPlaylistItem,
  playlistItemArchived
} from '../data'

import { fetchPlaylistItems, deletePlaylistItem, updatePlaylistItem } from '../../service/playlist'
import { put, call, takeLatest } from "redux-saga/effects"
import * as moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import { PLAYLIST_ITEM_MOCK } from './mock-playlist-item'

describe('Playlist API suite', () => {

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

    let result = await fetchPlaylistItems()
    expect(result.data).toEqual(payload)
  })

  it('Deletes a playlist item', async () => {
    expect.assertions(1)
    let returnStatus = 204

    moxios.stubOnce('DELETE', /.*\/items\/\d+/, {
      status: returnStatus
    })

    let result = await deletePlaylistItem(12345)
    expect(result).toEqual(true)
  })

  it('Archives a playlist item', async () => {
    expect.assertions(1)
    let returnStatus = 204

    moxios.stubOnce('PUT', /.*\/items\/\d+/, {
      status: returnStatus
    })

    let result = await updatePlaylistItem(PLAYLIST_ITEM_MOCK)
    expect(result).toEqual(returnStatus)
  })
})

describe('initialize playlist saga', () => {

  const
    saga = initializePlaylistItemsSaga(initializePlaylist());

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
      expected = call(fetchPlaylistItems)

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
    saga = removePlaylistItemSaga(removePlaylistItem(item_id))

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
      expected = call(deletePlaylistItem, item_id)

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

describe('archive playlist item saga', () => {
  const
    preArchiveItem = PLAYLIST_ITEM_MOCK,
    postArchiveItem = {
        ...PLAYLIST_ITEM_MOCK,
        attributes: {
          ...PLAYLIST_ITEM_MOCK.attributes,
          status: "played",
          finished: new Date().toString()
        }
      },
    saga = archivePlaylistItemSaga(archivePlaylistItem(preArchiveItem))

  it('dispatches ARCHIVING_PLAYLIST_ITEM action', function() {
    let
      nextVal = saga.next().value,
      expectedAction = archivingPlaylistItem(preArchiveItem)
      expectedAction.receivedAt = expect.any(Number)
    expect(nextVal).toEqual(put(expectedAction))
  })

  it('archives item', function() {
    let
      nextVal = saga.next().value,
      expected = call(updatePlaylistItem, preArchiveItem)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches PLAYLIST_ITEM_ARCHIVED action', function() {
    let
      nextVal = saga.next(postArchiveItem).value,
      expectedAction = playlistItemArchived(postArchiveItem)
      expectedAction.receivedAt = expect.any(Number)

    expect(nextVal).toEqual(put(expectedAction))
  })
})
