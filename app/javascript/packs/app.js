// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainMenu from './components/MainMenu.react'
import Playlist from './components/playlist/PlaylistItem'


const apm_account = new ApmAccount('/apm_accounts')
if(!apm_account.is_logged_in()) {
  window.location.href = apm_account.log_in_path()
}

// Improved tap events
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const App = () => (
  <MuiThemeProvider>
    <div>
      <MainMenu name={apm_account.get_name()} logoutPath={apm_account.log_out_path()} />
      <Playlist />
    </div>
  </MuiThemeProvider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
