import authLayer from '../lib/service/auth-layer'
import { insertMenu } from '../lib/components/MainMenu'
import apmgoConfig from '../lib/config'
// import * as OfflinePluginRuntime from 'offline-plugin/runtime'
// OfflinePluginRuntime.install()

// Verify we have a current auth token, then fetch data
if (authLayer.getExpiresAt() < Date.now()) {
  authLayer.refresh()
    .then(function (token) {
      initializeApp()
    })
    .catch(error => {
      // The session has expired, user must log in again
      window.location.href = authLayer.logInPath()
    })
} else {
  initializeApp()
}

function initializeApp () {
  insertMenu('nav.mainMenu_nav', {
    accountName: authLayer.getName(),
    logoutPath: authLayer.logOutPath(),
    accountPath: apmgoConfig.accountPath
  })

  document.querySelector('#loading').innerHTML = '<p>Loading ...</p>'

  System.import('./app').then((app) => {
    app.initialize()
  })
}
