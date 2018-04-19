const mongoose = require('mongoose')

let OrientationSchema = new mongoose.Schema({
  orientation: {
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    z: {
      type: Number
    },
    w: {
      type: Number
    },
    scale: {
      type: Number
    }
  },
  mission: {
    type: Number,
    ref: 'Mission'
  }
})

let Orientation = mongoose.model('Orientation', OrientationSchema)

module.exports = {
  Orientation
}
