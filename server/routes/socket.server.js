'use strict'

/*** ENVIRONMENT ***/
const path = process.cwd()
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'

/*** MODEL ***/
import Pin from '../models/Pin.js'

/*** Web Socket Events ***/
const ioEvents = io => {
  io.on('connection', serverSocket => {
    if (DEV) {
      console.log('Web Sockets connected.')
    }
    //Callback 1
    serverSocket.emit('start', 'Regular communications received...')

    //Callback 2
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
      }, received)
    })

    io.on('disconnect', () => {
      console.log('Web Sockets disconnected.')
    })
  })
}

export default ioEvents
