const mongoose = require('mongoose')

let OrientationSchema = new mongoose.Schema({
  Orientation: {
    type: Number
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
