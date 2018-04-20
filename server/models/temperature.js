const mongoose = require('mongoose')

let TemperatureSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true
  },
  mission: {
    type: Number,
    ref: 'mission',
    required: true
  }
})

let Temperature = mongoose.model('Temperature', TemperatureSchema)

module.exports = {
  Temperature
}
