'use strict'

/*** MODEL ***/
import Pin from '../models/Pin.js'

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
  const user = req.params.user

  Pin.findOne(
    {
      title: title,
      img: img,
      user: user
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
          user: user
        })
        newPin.save((err, doc) => {
          if (err) {
            console.error(err)
          }
          res.json('Your pin has been saved! Praise Jesus!')
          console.log('SAVED PIN: ', doc)
        })
      }
    }
  )
}
