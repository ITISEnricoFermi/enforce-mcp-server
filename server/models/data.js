const mongoose = require('mongoose')

let DataSchema = new mongoose.Schema({
  temperature: {
    type: Number
  },
  humidity: {
    type: Number
  },
  pressure: {
    type: Number
  }
})

let Data = mongoose.model('Data', DataSchema)

module.exports = {
  Data
}
