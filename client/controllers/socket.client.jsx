'use strict'

import openSocket from 'socket.io-client'
const clientSocket = openSocket()

//Check the full and user's library for differences between client and db
export const start = (interval, cb) => {
  clientSocket.on('start', cb)
  clientSocket.emit('start', interval)
}
