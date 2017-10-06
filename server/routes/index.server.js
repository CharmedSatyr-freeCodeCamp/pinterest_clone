'use strict'
const path = process.cwd()

//import { loginUser } from '../config/authConfig.js'

export const routes = (app /*, passport*/) => {
  //Main
  app.route('/').get((req, res) => {
    res.sendFile(path + '/dist/index.html')
  })
}
