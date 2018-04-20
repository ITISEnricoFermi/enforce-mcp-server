const mongoose = require('mongoose')

let MissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})

let Mission = mongoose.model('Mission', MissionSchema)

module.exports = {
  Mission
}
