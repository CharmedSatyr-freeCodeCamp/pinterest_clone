'use strict'

import openSocket from 'socket.io-client'
const clientSocket = openSocket()

//Check the full and user's library for differences between client and db
export const start = (interval, cb1, cb2) => {
  clientSocket.on('start', cb1)
  clientSocket.on('updateAllPins', cb2)
  clientSocket.emit('start', interval)
}
