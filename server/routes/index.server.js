'use strict'
const path = process.cwd()

import { allPins, savePin, unpinAll } from '../controllers/pinController.server.js'

export const routes = (app /*, passport*/) => {
  //Main
  app.route('/').get((req, res) => {
    res.sendFile(path + '/dist/index.html')
  })

  //Save new pin by user
  app.route('/api/:user/savePin/:data').post(savePin)

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
