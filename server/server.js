require('./db/config/config.js')
require('./db/mongoose')

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const socketIO = require('socket.io')
const path = require('path')
const ioClient = require('socket.io-client')
const { Motors } = require('./deps/Motors')

const motors = new Motors(process.env.SERPORT || '/dev/tty.usbserial-DN02B0LU')
const { xbee } = motors

// Routes
const missions = require('./routes/missions')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/missions/', missions)

const client = ioClient.connect('http://185.25.207.165:4000')

// Comunicazione con il sito
client.on('connect', () => {
  client.emit('data', {
    name: 'Test'
  })
})

const {
  Temperature
} = require('./models/temperature')

const {
  Humidity
} = require('./models/humidity')

const {
  Pressure
} = require('./models/pressure')

const {
  Location
} = require('./models/location')

const {
  Orientation
} = require('./models/orientation')

// Comunicazione con il client
io.on('connection', (socket) => {
  console.log('connected')

  socket.on('status', () => {
    console.log('status')
    xbee.sendCommand('s')
  })

  socket.on('mr0', () => {
    console.log('mr0')
    xbee.sendCommand('mr0')
  })

  socket.on('mr1', () => {
    console.log('mr1')
    xbee.sendCommand('mr1')
  })

  socket.on('ml0', () => {
    console.log('ml0')
    xbee.sendCommand('ml0')
  })

  socket.on('ml1', () => {
    console.log('ml1')
    xbee.sendCommand('ml1')
  })

  socket.on('g0', () => {
    console.log('g0')
    xbee.sendCommand('g0')
  })

  socket.on('g1', () => {
    console.log('g1')
    xbee.sendCommand('g1')
  })

  socket.on('i0', () => {
    console.log('i0')
    xbee.sendCommand('i0')
  })

  socket.on('i1', () => {
    console.log('i1')
    xbee.sendCommand('i1')
  })

  socket.on('b0', () => {
    console.log('b0')
    xbee.sendCommand('b0')
  })

  socket.on('b1', () => {
    console.log('b1')
    xbee.sendCommand('b1')
  })

  socket.on('c0', () => {
    console.log('c0')
    xbee.sendCommand('c0')
  })

  socket.on('c1', () => {
    console.log('c1')
    xbee.sendCommand('c1')
  })

  socket.on('cs0', () => {
    console.log('cs0')
    xbee.sendCommand('cs0')
  })

  socket.on('cs1', () => {
    console.log('cs1')
    xbee.sendCommand('cs1')
  })

  socket.on('p0', () => {
    console.log('p0')
    xbee.sendCommand('p0')
  })

  socket.on('p1', () => {
    console.log('p1')
    xbee.sendCommand('p1')
  })

  socket.on('xy', (marker) => {
    xbee.sendCommand(`x${marker.latitude},${marker.longitude}`)
  })

  xbee.on('status', async (status) => {
    return socket.emit('status', status)
  })

  xbee.on('temperature', async (temperature) => {
    console.log('Temperature: ', temperature)
    client.emit('temperature', temperature)
    socket.emit('temperature', temperature)
    // try {
    //   temperature = new Temperature({
    //     temperature
    //   })
    //   temperature = await temperature.save()
    // } catch (e) {
    //   console.log(e)
    // }
  })

  xbee.on('humidity', async (humidity) => {
    console.log('Humidity:', humidity)
    client.emit('humidity', humidity)
    socket.emit('humidity', humidity)
    // try {
    //   humidity = new Humidity({
    //     humidity
    //   })
    //   humidity = await humidity.save()
    // } catch (e) {
    //   console.log(e)
    // }
  })

  xbee.on('pressure', async (pressure) => {
    console.log('Pressure:', pressure)
    client.emit('pressure', pressure)
    socket.emit('pressure', pressure)
    // try {
    //   pressure = new Pressure({
    //     pressure
    //   })
    //   pressure = await pressure.save()
    // } catch (e) {
    //   console.log(e)
    // }
  })

  xbee.on('location', async (location) => {
    console.log('Location: ', location)
    location = JSON.parse(location)
    client.emit('position', JSON.stringify(location))
    socket.emit('position', JSON.stringify(location))
    // try {
    //   location = new Location({
    //     location
    //   })
    //   location = await location.save()
    // } catch (e) {
    //   console.log(e)
    // }
  })

  xbee.on('orientation', async (orientation) => {
    orientation = JSON.parse(orientation)
    console.log('Orientation: ', orientation)
    client.emit('orientation', JSON.stringify(orientation))
    socket.emit('orientation', JSON.stringify(orientation))
    // try {
    //   orientation = new Orientation({
    //     orientation
    //   })
    //   orientation = await orientation.save()
    // } catch (e) {
    //   console.log(e)
    // }
  })

  xbee.on('target', async (target) => {
    console.log('Target: ', target)
    client.emit('target', target.target)
    return socket.emit('target', target.target)
  })

  socket.on('left', (val) => {
    if (val) {
      console.log('Left motor started')
      motors.left_motor_on()
    } else {
      console.log('Left motor stopped')
      motors.left_motor_off()
    }
  })

  socket.on('right', (val) => {
    if (val) {
      console.log('Right motor started')
      motors.right_motor_on()
    } else {
      console.log('Right motor stopped')
      motors.right_motor_off()
    }
  })
})

app.use((err, req, res, next) => {
  res.status(500).send({
    messages: [err.message]
  })
  next(err)
})

server.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
