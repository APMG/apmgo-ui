import axios from 'axios'

// Actions
const RECEIVE_PLAYLIST_ITEMS = 'RECEIVE_PLAYLIST_ITEMS'

// Reducer
export default function reducer(state = {}, action = { type: 'DEFAULT', data: {}, receivedAt: Date.now() }) {
  switch (action.type) {
    case RECEIVE_PLAYLIST_ITEMS:
      return Object.assign({}, {
        data: action.data,
        receivedAt: action.receivedAt
      })
    default: return state
  }
}

// Action creators
export function receivePlaylistItems (json) {
  console.log(json)
  return {
    type: RECEIVE_PLAYLIST_ITEMS,
    data: json.data,
    receivedAt: Date.now()
  }
}

export function fetchPlaylistItems(access_token) {
  return function (dispatch) {

    // TODO: App state update to indicate API call started
    // dispatch(requestTimelineItems())
    var instance = axios.create({
      baseURL: 'https://bragi-api-dev.publicradio.org',
      timeout: 10000,
      headers: {'Authorization': `Bearer ${access_token}`}
    })

    instance.get('/items')
      .then(function (response) {
        return response.data
      }.bind(this))
      .then(json => dispatch(receivePlaylistItems(json)))
      .catch(function (error) {
        // TODO: Error handling
        console.log(error)
      })
  }
}
