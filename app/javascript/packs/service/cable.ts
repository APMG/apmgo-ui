import ActionCable from 'actioncable'

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
        }
      }
    )
  }
}
