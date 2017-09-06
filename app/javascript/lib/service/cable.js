// @flow
import ActionCable from 'actioncable'
import { addPlaylistItem } from '../redux/playlist.js'
import store from '../redux/store'

export class BragiItemChannelSubscription {

  static initiateSubscription = function(access_token: string) {
    var cable = ActionCable.createConsumer('wss://bragi-api-dev.publicradio.org/cable')
    var itemSub = cable.subscriptions.create(
      {
        channel: 'ItemsChannel',
        access_token: access_token
      },
      {
        connected: function() { console.info('CONNECTED') },
        disconnected: function() { console.warn('DISCONNECTED') },
        received: function(data) {
          console.log(data)
          if(data.action === 'create') {
            data.data.attributes.after = data.data.attributes.after_id
            delete data.data.attributes.after_id
            store.dispatch(addPlaylistItem(data.data))
          }
        }
      }
    )
  }
}
