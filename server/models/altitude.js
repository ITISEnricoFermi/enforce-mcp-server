const mongoose = require('mongoose')

let AltitudeSchema = new mongoose.Schema({
  altitude: {
    type: Number
  },
  mission: {
    type: Number
  }
})

let Altitude = mongoose.model('Altitude', AltitudeSchema)

module.exports = {
  Altitude
}
