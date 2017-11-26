'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Pin = new Schema({
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  img: {
    type: String,
    default: '../../client/img/image.png' //This is redundant from default client state
  },
  likes: [String],
  title: { type: String, required: true },
  owner: { type: String, required: true }
})

export default mongoose.model('Pin', Pin)
