const express = require('express')
const router = express.Router()
const _ = require('lodash')

// Middleware
const {
  asyncMiddleware
} = require('../middleware/async')

// Models
const {
  Mission
} = require('../models/mission')

router.get('/', asyncMiddleware(async (req, res) => {
  let missions = await Mission.find()
  console.log(missions)
  res.status(200).json(missions)
}))

router.put('/', asyncMiddleware(async (req, res) => {
  let body = _.pick(req.body.mission, ['title'])

  let mission = await Mission.find({
    title: body.title
  })

  if (mission.length) {
    return res.status(400).send({
      messages: ['Esiste già una missione con questo nome.']
    })
  }
  mission = new Mission(body)
  mission = await mission.save()
  res.status(200).send(mission)
}))

module.exports = router
