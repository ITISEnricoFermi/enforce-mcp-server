const mongoose = require('mongoose')

let PressureSchema = new mongoose.Schema({
  pressure: {
    type: Number
  },
  mission: {
    type: Number
  }
})

let Pressure = mongoose.model('Pressure', PressureSchema)

module.exports = {
  Pressure
}
