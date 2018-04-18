const mongoose = require('mongoose')

let HumiditySchema = new mongoose.Schema({
  humidity: {
    type: Number
  },
  mission: {
    type: Number
  }
})

let Humidity = mongoose.model('Humidity', HumiditySchema)

module.exports = {
  Humidity
}
