const mongoose = require('mongoose')

let PressureSchema = new mongoose.Schema({
  pressure: {
    type: Number,
    required: true
  }
  // mission: {
  //   type: Number,
  //   ref: 'mission',
  //   required: true
  // }
})

let Pressure = mongoose.model('Pressure', PressureSchema)

module.exports = {
  Pressure
}
