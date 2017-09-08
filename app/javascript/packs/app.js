// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import { initializePlaylist } from '../lib/redux/playlist'
import { BragiItemChannelSubscription } from '../lib/service/cable'
import apmAccount from '../lib/service/apm-account'
import store from '../lib/redux/store'
import App from '../lib/components/App'
import '../lib/styles/global.scss'

// Improved tap events
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Verify we have a current auth token, then fetch data
if (apmAccount.get_expires_at() < Date.now()) {
  apmAccount.refresh()
    .then(function (token) {
      store.dispatch(initializePlaylist())
    })
    .catch(error => {
      // The session has expired, user must log in again
      window.location.href = apmAccount.log_in_path()
    })
} else {
  store.dispatch(initializePlaylist())
}

BragiItemChannelSubscription.initiateSubscription(apmAccount.get_token())

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App
      accountName={apmAccount.get_name()}
      logoutPath={apmAccount.log_out_path()}
    />,
    document.getElementById('app')
  )
})
