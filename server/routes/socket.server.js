'use strict'

/*** MODEL ***/
import Pin from '../models/Pin.js'

/*** Web Socket Events ***/
const ioEvents = io => {
  io.on('connection', serverSocket => {
    console.log('Web Sockets connected.')

    serverSocket.on('start', received => {
      setInterval(() => {
        Pin.find({}, (err, doc) => {
          if (err) {
            console.error(err)
          }
          if (doc) {
            serverSocket.emit('updateAllPins', doc)
          }
        })

        //console.log('here', received)
        //serverSocket.emit('start', 'Regular communications received...')
      }, received)
    })

    io.on('disconnect', () => {
      console.log('Web Sockets disconnected.')
    })
  })
}

export default ioEvents
