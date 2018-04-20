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

const client = ioClient.connect('http://localhost:4000')

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

  // TODO: parsing dei dati e divisione in singoli eventi a seconda del dato
  xbee.removeAllListeners('data')
  xbee.on('temperature', async (temperature) => {
    console.log('Temperature: ', temperature)
    temperature = new Temperature(temperature)
    temperature = await Temperature.save()
    client.emit('temperature', temperature)
    return socket.emit('temperature', temperature)
  })

  xbee.on('humidity', async (humidity) => {
    console.log('Humidity:', humidity)
    humidity = new Humidity(humidity)
    humidity = await Humidity.save()
    client.emit('humidity', humidity)
    return socket.emit('humidity', humidity)
  })

  xbee.on('pressure', async (pressure) => {
    console.log('Pressure:', pressure)
    pressure = new Pressure(pressure)
    pressure = await Pressure.save()
    client.emit('pressure', pressure)
    return socket.emit('pressure', pressure)
  })

  xbee.on('location', async (location) => {
    console.log('Location: ', location)
    location = new Location(location)
    location = await Location.save()
    client.emit('position', location)
    return socket.emit('position', location)
  })

  xbee.on('orientation', async (orientation) => {
    console.log('Orientation: ', orientation)
    orientation = new Orientation(orientation)
    orientation = await Orientation.save()
    client.emit('orientation', orientation)
    return socket.emit('orientation', orientation)
  })

  xbee.on('target', async (target) => {
    console.log('Target: ', target)
    client.emit('target', target)
    return socket.emit('target', target)
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
