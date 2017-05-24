import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchPlaylistItems } from '../playlist'
import * as moxios from 'moxios'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('creates RECEIVE_PLAYLIST_ITEMS when fetching playlist items has been done', () => {
    moxios.stubRequest(/.*\/items/, {
        status: 200,
        response: { data: 'SAMPLE_DATA' }
      })

    const store = mockStore()

    return store.dispatch(fetchPlaylistItems('SAMPLE_TOKEN'))
      .then(() => { // return of async actions
        let actions = store.getActions()
        expect(store.getActions()).toContainEqual({
          data: "SAMPLE_DATA",
          type: "RECEIVE_PLAYLIST_ITEMS",
          receivedAt: expect.any(Number)
        })
      })
  })
})