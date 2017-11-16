# README

This project uses rbenv to manage its Ruby version.

## Ruby setup

1. Run `bundle install` to get the Ruby dependencies for this project

## Javascript setup

1. Run `yarn` to install Javascript dependencies for this project

## Invoker

1. If it's not already installed, you'll need Invoker: `gem install invoker`
2. Run `sudo invoker setup`, which sets up a DNS resolver and firewall rule to allow Invoker to use custom domains and forward to ports 80 and 443.
3. Run `invoker start config/invoker.ini` to start Rails and Webpack.
4. Visit https://apmgo.dev and https://apmgojs.dev:9001/packs/app.js in your browser to verify that Rails and Webpack assets are being served. You will most likely need to add security exceptions for both domains to trust the SSL certificate.
5. If you're having issues, restarting your machine and upgrading to a newer version of OS X are both possible solutions.

If you'd like to run a process outside of the Invoker stream (for instance, if you'd like to add a pry breakpoint in Rails and use the interactive REPL) you can comment out that application's entry in `config/invoker.ini`. You would then start the app and allow Invoker to handle its network traffic using `add_http`. For Rails, this would look like:

```bash
$ rails s -p 3001
$ invoker add_http rails 3001
```

## Javascript testing
1. Run `npm run test` to execute Jest tests
2. Run `npm run test:watch` to execute Jest tests in watch mode
3. Run `npm run test:debug` to execute Jest tests in debug mode (the process will wait for a debugger to attach before executing)

## Configuration

The API and WebSocket endpoints, along with a few other items, must be configured in `app/javascript/lib/config.js` (copy `app/javascript/lib/config.example.js` to get started)

Rails configuration should also be modified to fit your needs, and copied from `config/apmgo.example.yml` to `config/apmgo.yml`

Logo should be copied from `app/views/partials/_logo.example.html.erb` to `app/views/partials/_logo.html.erb`

## Authentication

APMGo was designed to support OAuth2. A shim around your authentication solution that conforms to the following API implemented in `app/javascript/lib/service/auth-layer.js` (the skeleton of which can be found in `app/javascript/lib/service/auth-layer.example.js`) will be enough to get you going:

* `authLayer.getExpiresAt()` - Date
  * Returns a JavaScript Date object with the token's expiration time
* `authLayer.getName()` - String
  * Returns the user's display name
* `authLayer.getToken()` - String
  * Returns an OAuth2 token
* `authLayer.isLoggedIn()` - Boolean
  * Returns true if the user is logged in, false otherwise
* `authLayer.logInPath()` - String
  * Returns the URL that the user must visit to log in
* `authLayer.logOutPath()` - String
  * Returns the URL that the user must visit to log out
* `authLayer.refresh()` - Promise.<string|Error>
  * Returns a promises that receives an OAuth2 token when fulfilled

## Sample Client Implementation

In Rails development environment, you can visit `apmgo.dev/add_audio` to see a sample implementation of what's needed to add audio to an APMGo playlist. The relevant source code for this implementation lives in `app/views/home/add_audio.html.erb` and `app/assets/javascripts/add_audio.js`, with a non-functional example OAuth2 implementation.

The template contains the schema.org data necessary for creating a playlist item. For more information, see `AUDIO_METADATA.md`

## Code Structure

React components in this project will be written using the Redux approach of "Container" and "Presentational" components (also referred to as "Smart" and "Dumb"). Where possible, container and presentational components will be grouped together in the same file. Additionally, components will be grouped together into directories by domain.

## Flow

Some syntax may appear unfamiliar. That's because this code is written using the static type checker [Flow](https://flow.org). Babel's [flow preset](https://babeljs.io/docs/plugins/preset-flow/) is configured in `.babelrc-apm` to strip out flow syntax during Webpack compilation.

### Ducks

Redux actions, reducers, and sagas will be grouped together in [Ducks](https://github.com/erikras/ducks-modular-redux) by use case. The app uses three ducks, located in the `/app/javascript/lib/redux` directory.

* **The Audio Player duck** lives in `audio-player.js`. It manages state and provides action creators related to the audio player itself: which track is playing (just the id), how long the track is, the current playtime, volume, play/pause status, mute status etc.

* **The Data duck** lives in `data.js`. It handles things related to the api layer: when an item is deleted, or archived, or when the app first fetches a user's playlist. Because the Data duck handles all of the app's asynchronous actions, all of the app's [Sagas](https://redux-saga.js.org/) are located here.

* **The Playlist duck** lives in `playlist.js`. It manages state and provides action creators related to the app's representation of the playlist and each item in it. For example, when an item plays for a second, the Playlist duck updates that specific item's `currentTime` property.

#### Ducks work together!
We take pains to separate concerns and avoid redundancy. But sometimes, ducks will have overlapping areas of interest. For example, when the `currentTime` on a playing item changes (once per second, if it's playing), then the Playlist duck needs to update that playlist item, and the Audio Player duck needs to update its own `currentTime` so it can properly track and display it. When an item is moved, the Playlist Duck reorders its own internal array, and the Data Duck sends out an API call to make sure the move is persisted.

#### Ducks get confused

It is sometimes difficult to determine which action belongs with which duck. When a user drags a `PlaylistItem`, it needs to be moved within the redux state as it is dragged across each `ItemSlot` in order to update the UI. The Playlist duck handles that. But when it is finally dropped in its new position, the Data duck fires an API call. Where should the `movePlaylistItem` action live?

For now the operation is split into two actions: `movePlaylistItem`, an imperative command to reorder the redux playlist, and `playlistItemMoved`, an event signaling the action is complete and it's time to call the api. It does make sense, but it might make just as much sense the other way around, and it's not obvious which action does what just by reading the name. So, naming conventions could be improved for clarity.
