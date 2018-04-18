const mongoose = require('mongoose')

let MissionSchema = new mongoose.Schema({
  title: {
    type: String
  }
})

let Mission = mongoose.model('Mission', MissionSchema)

module.exports = {
  Mission
}
