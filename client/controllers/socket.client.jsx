'use strict'

/*** WEB SOCKETS ***/
import openSocket from 'socket.io-client'
const clientSocket = openSocket()

/*** MAIN - FUNCTION CALLED IN APP COMPONENT ***/
export const start = (interval, cb1, cb2) => {
  clientSocket.on('start', cb1)
  clientSocket.on('updateAllPins', cb2)
  clientSocket.emit('start', interval)
}
