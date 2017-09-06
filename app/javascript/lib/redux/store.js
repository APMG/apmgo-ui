import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-saga'
import dataReducer from './data'
import playerReducer from './audio-player'
import playlistReducer from './playlist'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

let store = createStore(
  combineReducers({
    data: dataReducer,
    playlist: playlistReducer,
    audioPlayer: playerReducer
  }),
  enhancer
)

// The root saga is composed of all the app's individual
// listener sagas - any saga that begins with "take", "takeEvery" or "takeLatest"
// this bootstraps it onto the sagaMiddleware
sagaMiddleware.run(rootSaga)

export default store
