import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainMenu from './components/MainMenu.react'
import Playlist from './components/playlist/Playlist'
import playlistReducer, { fetchPlaylistItems } from './redux/playlist'
import axios from 'axios'
import { Provider } from 'react-redux'

const apm_account = new ApmAccount('/apm_accounts')
if(!apm_account.is_logged_in()) {
  window.location.href = apm_account.log_in_path()
}

// Improved tap events
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let middleware = [thunkMiddleware]
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

let store = createStore(
  playlistReducer,
  enhancer
)

// Verify we have a current auth token, then fetch data
if(apm_account.get_expires_at() < Date.now()) {
  apm_account.refresh()
    .then(function (token) {
      store.dispatch( fetchPlaylistItems(apm_account.get_token()) )
    })
    .catch(function (error) {
      // TODO: Error handling
      console.error('Could not refresh access token')
    })
} else {
  store.dispatch( fetchPlaylistItems(apm_account.get_token()) )
}

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <div>
        <MainMenu name={apm_account.get_name()} logoutPath={apm_account.log_out_path()} />
        <Playlist />
      </div>
    </Provider>
  </MuiThemeProvider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
