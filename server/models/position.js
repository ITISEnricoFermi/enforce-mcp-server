const mongoose = require('mongoose')

let PositionSchema = new mongoose.Schema({
  position: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    altitude: {
      type: Number
    }
  },
  mission: {
    type: Number
  }
})

let Position = mongoose.model('Position', PositionSchema)

module.exports = {
  Position
}
