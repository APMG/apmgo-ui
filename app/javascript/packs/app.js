// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import store from '../lib/redux/store'
import { initializePlaylist } from '../lib/redux/data'
import { BragiItemChannelSubscription } from '../lib/service/cable'
import authLayer from '../lib/service/auth-layer'
import App from '../lib/components/App'
import '../lib/styles/global.scss'

BragiItemChannelSubscription.initiateSubscription(authLayer.getToken())

const initialize = () => {
  store.dispatch(initializePlaylist())
  ReactDOM.render(
    <App
      accountName={authLayer.getName()}
      logoutPath={authLayer.logOutPath()}
    />,
    document.getElementById('app')
  )
}

export { initialize }
