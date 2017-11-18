'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Pin = new Schema({
  title: String,
  img: String,
  likes: [String]
})

export default mongoose.model('Pin', Pin)
