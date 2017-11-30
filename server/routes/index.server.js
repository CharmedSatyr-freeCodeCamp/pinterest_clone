'use strict'
const path = process.cwd()

import {
  allPins,
  savePin,
  deletePin,
  toggleLikePin,
  unpinAll
} from '../controllers/pinController.server.js'

export const routes = (app, passport) => {
  //Authorization
  let name_view
  const permissions = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('IN!', req.user)
      name_view = req.user.github.username ? req.user.github.username : req.user.twitter.username
      next()
    } else {
      res.redirect('/login')
    }
  }
  //Login
  app.route('/login').get((req, res) => {
    res.sendFile(path + '/dist/login.html')
  })

  //Twitter Auth
  app.route('/auth/twitter').get(passport.authenticate('twitter'))

  //Twitter Auth
  app.route('/auth/twitter/callback').get(
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

  //GitHub Auth
  app.route('/auth/github').get(passport.authenticate('github'))

  //GitHub Auth
  app.route('/auth/github/callback').get(
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

  //Auth Logout
  app.route('/logout').get(permissions, (req, res) => {
    req.logout()
    res.redirect('/login')
  })

  //Main
  app.route('/').get(permissions, (req, res) => {
    res.sendFile(path + '/dist/index.html')
  })

  //Get loggedUser
  app.route('/api/users/logged').get(permissions, (req, res) => {
    res.json(name_view)
  })

  //Save new pin
  app.route('/api/savePin/:data').post(permissions, savePin)

  //Delete pin
  app.route('/api/deletePin/:data').delete(permissions, deletePin)

  //All pins
  app.route('/api/allPins').get(allPins)

  //Like or unlike a pin
  app.route('/api/toggleLikePin/:data').post(permissions, toggleLikePin)

  /*** DEBUGGING - No UI ***/
  //Delete all pins
  app.use('/api/unpinAll', unpinAll)
}
