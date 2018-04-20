const mongoose = require('mongoose')

let OrientationSchema = new mongoose.Schema({
  orientation: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    z: {
      type: Number,
      required: true
    },
    w: {
      type: Number,
      required: true
    }
  },
  mission: {
    type: Number,
    ref: 'mission'
  }
})

let Orientation = mongoose.model('Orientation', OrientationSchema)

module.exports = {
  Orientation
}
