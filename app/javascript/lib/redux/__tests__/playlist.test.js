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

import { fetchPlaylistItems, deletePlaylistItem, apiArchivePlaylistItem } from '../../service/playlist'
import { put, call, takeLatest } from "redux-saga/effects"
import * as moxios from 'moxios'
import configureMockStore from 'redux-mock-store'

const PLAYLIST_ITEM_MOCK = {
  attributes: {
    after: "todo",
    "audio_description": "My boss told me to make a long description, so I did.",
    "audio_hosts": "John Doe",
    "audio_identifier": "2016/01/01/smart-audio",
    "audio_program": "Spending Money",
    "audio_title": "Smart Audio",
    "audio_url": "https://ondemand.npr.org/anon.npr-mp3/npr/atc/2017/04/20170417_atc_schools_will_soon_have_to_put_in_writing_if_they_lunch_shame.mp3?orgId=227&topicId=1013&d=217&p=2&story=524234563&t=progseg&e=524383015&seg=14&ft=nprml&f=524234563",
    "finished": null,
    "origin_url": "https://example.com/smart-audio",
    "playtime": 123456,
    "source": "example",
    "status": "unplayed"
  },
  id: 1,
  type: "bragi-items"
}

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

  it('Archives a playlist item', async () => {
    expect.assertions(1)
    let returnStatus = 204,
      postArchiveItem = {
        ...PLAYLIST_ITEM_MOCK,
        attributes: {
          ...PLAYLIST_ITEM_MOCK.attributes,
          status: "played",
          finished: new Date().toString()
        }
      }

    moxios.stubOnce('PUT', /.*\/items\/\d+/, {
      status: returnStatus
    })

    let result = await apiArchivePlaylistItem(token, PLAYLIST_ITEM_MOCK)
    expect(result).toEqual(postArchiveItem)
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

describe('archive playlist item saga', () => {
  const
    token = 'SAMPLE_TOKEN',
    preArchiveItem = PLAYLIST_ITEM_MOCK,
    postArchiveItem = {
        ...PLAYLIST_ITEM_MOCK,
        attributes: {
          ...PLAYLIST_ITEM_MOCK.attributes,
          status: "played",
          finished: new Date().toString()
        }
      },
    saga = archivePlaylistItemSaga(archivePlaylistItem(token, preArchiveItem))

  it('dispatches ARCHIVING_PLAYLIST_ITEM action', function() {
    let
      nextVal = saga.next().value,
      expectedAction = archivingPlaylistItem(preArchiveItem)

    expect(nextVal).toEqual(put(expectedAction))
  })

  it('archives item', function() {
    let
      nextVal = saga.next().value,
      expected = call(apiArchivePlaylistItem, token, preArchiveItem)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches PLAYLIST_ITEM_ARCHIVED action', function() {
    let
      nextVal = saga.next(postArchiveItem).value,
      expectedAction = playlistItemArchived(postArchiveItem)

    expect(nextVal).toEqual(put(expectedAction))
  })
})
