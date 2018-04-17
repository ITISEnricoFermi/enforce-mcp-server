const mongoose = require('mongoose')

let TemperatureSchema = new mongoose.Schema({
  temperature: {
    type: Number
  },
  mission: {
    type: Number
  }
})

let Temperature = mongoose.model('Temperature', TemperatureSchema)

module.exports = {
  Temperature
}
