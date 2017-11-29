'use strict'
const path = process.cwd()

import {
  allPins,
  savePin,
  deletePin,
  toggleLikePin,
  unpinAll
} from '../controllers/pinController.server.js'

export const routes = (app /*, passport*/) => {
  //Main
  app.route('/').get((req, res) => {
    res.sendFile(path + '/dist/index.html')
  })

  //Get loggedUser
  app.route('/api/users/logged').get((req, res) => {
    res.json('secondSatyr')
  })

  //Save new pin
  app.route('/api/savePin/:data').post(savePin)

  //Delete pin
  app.route('/api/deletePin/:data').delete(deletePin)

  //All pins
  app.route('/api/allPins').get(allPins)

  //Like or unlike a pin
  app.route('/api/toggleLikePin/:data').post(toggleLikePin)

  /*** DEBUGGING - No UI ***/
  //Delete all pins
  app.use('/api/unpinAll', unpinAll)
}
