type webSocket
type optionalWebSocket = option<webSocket>
type subscriptions
type consumer = {
  disconnect: unit => unit,
  subscriptions: subscriptions,
}
type actionCable = {createConsumer: unit => consumer}
type createConsumer
type subscription<'sendData> = {
  consumer: consumer,
  send: 'sendData => unit,
}
type subscriprtionCallbacks<'updateData> = {
  connected: unit => unit,
  received: 'updateData => unit,
  disconnected: unit => unit,
}

@val @scope("window") @return(nullable)
external webSocket: option<webSocket> = "WebSocket"
@val external actionCable: actionCable = "ActionCable"
@send
external createSubscription: (
  subscriptions,
  string,
  subscriprtionCallbacks<'updateData>,
) => subscription<'sendData'> = "create"
@send external sendData: (subscription<'sendData>, 'sendData) => unit = "send"
@send external unsubscribeSubscription: subscription<'sendData'> => unit = "unsubscribe"
@send external diconnectConsumer: consumer => unit = "disconnect"

let subscribeConsumer = (
  channnelName: string,
  subscriprtionCallbacks: subscriprtionCallbacks<'updateData>,
) => {
  let consumer = actionCable.createConsumer()
  createSubscription(consumer.subscriptions, channnelName, subscriprtionCallbacks)
}
