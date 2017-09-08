import { put, call } from 'redux-saga/effects'
import {
  receivePlaylistItems,
  archivePlaylistItem,
  removePlaylistItem
} from './playlist'
import {
  initializePlaylist,
  fetchingPlaylistItems,
  removingPlaylistItem,
  playlistItemRemoved,
  archivingPlaylistItem,
  playlistItemArchived,
  initializePlaylistItemsSaga,
  removePlaylistItemSaga,
  archivePlaylistItemSaga
} from './data'
import { fetchPlaylistItems, deletePlaylistItem, updatePlaylistItem } from '../service/playlist'
import { itemFixtures } from '../__tests__/testHelpers'

describe('initialize playlist saga', () => {
  const saga = initializePlaylistItemsSaga(initializePlaylist())

  it('dispatches FETCHING_PLAYLIST_ITEMS action', () => {
    let nextVal = saga.next().value
    let expectedAction = fetchingPlaylistItems()

    expectedAction.receivedAt = expect.any(Number)

    expect(nextVal).toEqual(put(expectedAction))
  })

  it('receives playlist', () => {
    let nextVal = saga.next().value
    let expected = call(fetchPlaylistItems)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches RECEIVE_PLAYLIST_ITEMS action', () => {
    let mockResponse = { data: 'json' }
    let nextVal = saga.next(mockResponse).value
    let expectedAction = receivePlaylistItems(mockResponse)
    expectedAction.receivedAt = expect.any(Number)

    expect(nextVal).toEqual(put(expectedAction))
    expect(saga.next().done).toBeTruthy()
  })
})

describe('remove playlist item saga', () => {
  const itemId = 12345
  const saga = removePlaylistItemSaga(removePlaylistItem(itemId))

  it('dispatches REMOVING_PLAYLIST_ITEM action', function () {
    let nextVal = saga.next().value
    let expectedAction = removingPlaylistItem(itemId)

    expectedAction.receivedAt = expect.any(Number)

    expect(nextVal).toEqual(put(expectedAction))
  })

  it('deletes item', function () {
    let nextVal = saga.next().value
    let expected = call(deletePlaylistItem, itemId)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches PLAYLIST_ITEM_REMOVED action', function () {
    let nextVal = saga.next().value
    let expectedAction = playlistItemRemoved(itemId)

    expectedAction.receivedAt = expect.any(Number)

    expect(nextVal).toEqual(put(expectedAction))
  })
})

describe('archive playlist item saga', () => {
  const preArchiveItem = itemFixtures[0]
  const postArchiveItem = {
    ...preArchiveItem,
    attributes: {
      ...preArchiveItem.attributes,
      status: 'played',
      finished: new Date().toString()
    }
  }
  const saga = archivePlaylistItemSaga(archivePlaylistItem(preArchiveItem))

  it('dispatches ARCHIVING_PLAYLIST_ITEM action', function () {
    let nextVal = saga.next().value
    let expectedAction = archivingPlaylistItem(preArchiveItem)

    expectedAction.receivedAt = expect.any(Number)
    expect(nextVal).toEqual(put(expectedAction))
  })

  it('archives item', function () {
    let nextVal = saga.next().value
    let expected = call(updatePlaylistItem, preArchiveItem)

    expect(nextVal).toEqual(expected)
  })

  it('dispatches PLAYLIST_ITEM_ARCHIVED action', function () {
    let nextVal = saga.next(postArchiveItem).value
    let expectedAction = playlistItemArchived(postArchiveItem)

    expectedAction.receivedAt = expect.any(Number)

    expect(nextVal).toEqual(put(expectedAction))
  })
})
