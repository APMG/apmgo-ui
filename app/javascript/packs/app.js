// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import store from '../lib/redux/store'
import { initializePlaylist } from '../lib/redux/data'
import { BragiItemChannelSubscription } from '../lib/service/cable'
import apmAccount from '../lib/service/apm-account'
import App from '../lib/components/App'
import '../lib/styles/global.scss'

BragiItemChannelSubscription.initiateSubscription(apmAccount.get_token())

const initialize = () => {
  store.dispatch(initializePlaylist())
  ReactDOM.render(
    <App
      accountName={apmAccount.get_name()}
      logoutPath={apmAccount.log_out_path()}
    />,
    document.getElementById('app')
  )
}

export { initialize }
