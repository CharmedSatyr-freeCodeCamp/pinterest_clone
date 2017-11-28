'use strict'

/*** MODEL ***/
import Pin from '../models/Pin.js'

/*** FUNCTIONS ***/
//Toggle Like Pin
export const toggleLikePin = (req, res) => {
  const obj = JSON.parse(decodeURIComponent(req.params.data))
  const title = obj.title
  const img = obj.img
  const owner = obj.owner
  const user = obj.loggedUser

  Pin.findOne(
    {
      title: title,
      img: img,
      owner: owner
    },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        //If the user already liked the pin
        if (doc.likes.indexOf(user) >= 0) {
          //Remove the like
          doc.likes.splice(doc.likes.indexOf(user), 1)
          console.log('This pin has been unliked!')
        } else {
          //Otherwise add it
          doc.likes.push(user)
          console.log('This pin has been liked!')
        }
        //Save what happened
        doc.save((err, result) => {
          res.json('Saved' + result)
        })
      }
    }
  )
}

//Get all pins
export const allPins = (req, res) => {
  Pin.find({}, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      res.json(doc)
    }
  })
}

//Delete all pins
export const unpinAll = (req, res) => {
  Pin.remove({}, (err, doc) => {
    res.json('All pins deleted.')
  })
}

//Save new Pin
export const savePin = (req, res) => {
  const obj = JSON.parse(decodeURIComponent(req.params.data))
  const title = obj.title
  const img = obj.img
  const owner = obj.owner
  Pin.findOne(
    {
      title: title,
      img: img,
      owner: owner
    },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        res.json('You already pinned this!')
      } else {
        const newPin = new Pin({
          title: title,
          img: img,
          owner: owner
        })
        newPin.save((err, doc) => {
          if (err) {
            console.error(err)
          }
          res.json('Your pin has been saved!')
        })
      }
    }
  )
}

//Delete Pin
export const deletePin = (req, res) => {
  const obj = JSON.parse(decodeURIComponent(req.params.data))
  const title = obj.title
  const img = obj.img
  const owner = obj.owner

  Pin.remove(
    {
      title: title,
      img: img,
      owner: owner
    },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        res.json('Your pin has been deleted.')
      }
    }
  )
}
