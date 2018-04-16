const express = require('express')
const router = express.Router()
const _ = require('lodash')

const {
  asyncMiddleware
} = require('../middleware/async')

// Models
const {
  Data
} = require('../models/data')

router.put('/data/', asyncMiddleware(async (req, res) => {
  let body = _.pick(req.body.data, ['temperature', 'humidity', 'pressure'])
  let data = await (new Data(body)).save()
  res.status(200).json(data)
}))

router.get('/data/', asyncMiddleware(async (req, res) => {
  let data = await Data.find()
  res.status(200).send(data)
}))

router.get('/data/:id', asyncMiddleware(async (req, res) => {
  let data = await Data.findById(req.params.id)
  res.status(200).send(data)
}))

router.post('/data/', asyncMiddleware(async (req, res) => {

}))

module.exports = router
