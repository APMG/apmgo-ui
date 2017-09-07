import { fetchPlaylistItems, deletePlaylistItem, updatePlaylistItem } from './playlist'
import * as moxios from 'moxios'
import { itemFixtures } from '../__tests__/testHelpers'

describe('Playlist API suite', () => {
  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
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

    let result = await updatePlaylistItem(itemFixtures[0])
    expect(result).toEqual(returnStatus)
  })
})
