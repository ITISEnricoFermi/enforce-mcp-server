const mongoose = require('mongoose')

let LocationSchema = new mongoose.Schema({
  location: {
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

let Location = mongoose.model('Location', LocationSchema)

module.exports = {
  Location
}
