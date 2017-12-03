'use strict'

/*** ENVIRONMENT ***/
const path = process.cwd()
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
const PROD = process.env.NODE_ENV === 'production'

/*** CONTROLLERS ***/
import {
  allPins,
  savePin,
  deletePin,
  toggleLikePin,
  unpinAll
} from '../controllers/pinController.server.js'

/*** ROUTES ***/
export const routes = (app, passport) => {
  //This is the name that will display in the client view
  let name_view

  //Authorization check
  const permissions = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (DEV) {
        console.log('AUTHORIZATION SUCCESSFUL')
      }
      if (req.user.github.username) {
        name_view = req.user.github.username
      } else if (req.user.twitter.username) {
        name_view = req.user.twitter.username
      }
      console.log('USER:', name_view)
      return next()
    } else {
      if (DEV) {
        console.log('USER NOT AUTHORIZED')
      }
      res.redirect('/login')
    }
  }

  /*
  //Allows session's name_view to be accessed by controllers
  app.use((req, res, next) => {
    res.locals.name_view = name_view
    next()
  })
  */

  //Root view
  app.route('/').get(permissions, (req, res) => {
    //Enforce HTTPS in production
    if (PROD) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        res.redirect(process.env.APP_URL)
      } else {
        res.sendFile(path + '/dist/index.html')
      }
    } else {
      res.sendFile(path + '/dist/index.html')
    }
  })

  //Login view
  app.route('/login').get((req, res) => {
    //Enforce HTTPS in production
    if (PROD) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        res.redirect(process.env.APP_URL + '/login')
      } else {
        res.sendFile(path + '/dist/login.html')
      }
    } else {
      res.sendFile(path + '/dist/login.html')
    }
  })

  //GitHub and Passport.js authentication - URL
  app.route('/auth/github').get(passport.authenticate('github'))

  //GitHub and Passport.js authentication - callback
  app.route('/auth/github/callback').get(
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

  //Twitter Auth
  app.route('/auth/twitter').get(passport.authenticate('twitter'))

  //Twitter Auth
  app.route('/auth/twitter/callback').get(
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

  //Client-side API path to GET name_view
  //Unclear why this won't work with a permissions check
  app.route('/api/users/logged').get(
    /*permissions,*/ (req, res) => {
      if (DEV) {
        console.log('Client requesting username...')
      }
      if (name_view) {
        res.json(name_view)
      } else {
        console.log('name_view ERROR')
        res.json('Stranger')
      }
    }
  )

  //Passport logout
  app.route('/logout').get((req, res) => {
    req.logout()
    res.redirect('/login')
  })

  //Save new pin
  //Unclear why this won't work with a permissions check
  app.route('/api/savePin/:data').post(/*permissions,*/ savePin)

  //Delete pin
  //Unclear why this won't work with a permissions check
  app.route('/api/deletePin/:data').delete(/*permissions,*/ deletePin)

  //All pins
  app.route('/api/allPins').get(allPins)

  //Like or unlike a pin
  //Unclear why this won't work with a permissions check
  app.route('/api/toggleLikePin/:data').post(/*permissions,*/ toggleLikePin)

  /*** DEBUGGING - No UI ***/
  //Delete all pins
  app.use('/api/unpinAll', unpinAll)
}
