'use strict'

const ioEvents = io => {
  io.on('connection', serverSocket => {
    console.log('Web Sockets connected.')

    serverSocket.on('start', received => {
      setInterval(() => {
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
