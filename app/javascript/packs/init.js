import apmAccount from '../lib/service/apm-account'
import { insertHeader } from '../lib/components/MainMenu'

// Verify we have a current auth token, then fetch data
if (apmAccount.get_expires_at() < Date.now()) {
  apmAccount.refresh()
    .then(function (token) {
      initializeApp()
    })
    .catch(error => {
      // The session has expired, user must log in again
      window.location.href = apmAccount.log_in_path()
    })
} else {
  initializeApp()
}

function initializeApp () {
  insertHeader('#header', {
    accountName: apmAccount.get_name(),
    logoutPath: apmAccount.log_out_path(),
    accountPath: 'https://accounts.publicradio.org'
  })

  document.querySelector('#loading').innerHTML = '<p>Loading ...</p>'

  System.import('./app').then((app) => {
    app.initialize()
  })
}
