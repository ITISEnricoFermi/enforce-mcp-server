const mongoose = require('mongoose')

let HumiditySchema = new mongoose.Schema({
  humidity: {
    type: Number,
    required: true
  },
  mission: {
    type: Number,
    ref: 'mission'
  }
})

let Humidity = mongoose.model('Humidity', HumiditySchema)

module.exports = {
  Humidity
}
