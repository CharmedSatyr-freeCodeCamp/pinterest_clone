'use strict'
const path = process.cwd()

import { allPins, savePin, deletePin, unpinAll } from '../controllers/pinController.server.js'

export const routes = (app /*, passport*/) => {
  //Main
  app.route('/').get((req, res) => {
    res.sendFile(path + '/dist/index.html')
  })

  //Save new pin
  app.route('/api/savePin/:data').post(savePin)

  //Delete pin
  app.route('/api/deletePin/:data').delete(deletePin)

  //All pins
  app.route('/api/allPins').get(allPins)

  //Get loggedUser
  app.route('/api/users/logged').get((req, res) => {
    res.json('LoggedSatyr')
  })

  /*** DEBUGGING - No UI ***/
  //Delete all pins
  app.use('/api/unpinAll', unpinAll)
}
