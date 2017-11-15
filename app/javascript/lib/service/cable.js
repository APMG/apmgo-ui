// @flow
import ActionCable from 'actioncable'
import { addPlaylistItem } from '../redux/playlist.js'
import store from '../redux/store'
import apmgoConfig from '../config'

export class BragiItemChannelSubscription {
  static initiateSubscription = function (accessToken: string) {
    var cable = ActionCable.createConsumer(apmgoConfig.actionCableEndpoint)
    var itemSub = cable.subscriptions.create(
      {
        channel: 'ItemsChannel',
        access_token: accessToken
      },
      {
        connected: function () {
          // WebSocket connection successfully established
        },
        disconnected: function () {
          // WebSocket connection broken
        },
        received: function (data) {
          console.log(data)
          if (data.action === 'create') {
            data.data.attributes.after = data.data.attributes.after_id
            delete data.data.attributes.after_id
            store.dispatch(addPlaylistItem(data.data))
          }
        }
      }
    )
    return itemSub
  }
}
