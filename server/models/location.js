const mongoose = require('mongoose')

let LocationSchema = new mongoose.Schema({
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    altitude: {
      type: Number,
      required: true
    },
    speed: {
      type: Number,
      required: true
    }
  },
  mission: {
    type: Number,
    ref: 'mission'
  }
})

let Location = mongoose.model('Location', LocationSchema)

module.exports = {
  Location
}
