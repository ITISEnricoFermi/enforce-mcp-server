// require('./db/config/config.js')
// require('./db/mongoose')

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const socketIO = require('socket.io')
const path = require('path')
const ioClient = require('socket.io-client')
const {Motors} = require('./deps/Motors')

const motors = new Motors(process.env.SERPORT || '/dev/tty.usbserial-DN02B0LU')
const {xbee} = motors

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
  client.emit('data', {name: 'Test'})
})

const {Temperature} = require('./models/temperature')

const {Humidity} = require('./models/humidity')

const {Pressure} = require('./models/pressure')

const {Location} = require('./models/location')

const {Orientation} = require('./models/orientation')

// Comunicazione con il client
io.on('connection', (socket) => {
  console.log('connected')

  socket.on('status', () => {
    console.log('status')
    xbee.send('s')
  })

  socket.on('sensors', (sensor, status) => {
    switch (sensor) {
      case ('i'):
        if (status) {
          return xbee.send('command', 'sensors -i 1')
        }

        xbee.send('command', 'sensors -i 0')
        break
      case ('g'):
        if (status) {
          return xbee.send('command', 'sensors -g 1')
        }
        xbee.send('command', 'sensors -g 0')
        break
      case ('t'):
        if (status) {
          return xbee.send('command', 'sensors -t 1')
        }
        xbee.send('command', 'sensors -t 1')
        break
    }
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

  // Eventi Xbee

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

  xbee.on('position', async (position) => {
    console.log('position: ', position)
    position = JSON.parse(position)
    client.emit('position', JSON.stringify(position))
    socket.emit('position', JSON.stringify(position))
    // try {
    //   position = new Location({
    //     position
    //   })
    //   position = await position.save()
    // } catch (e) {
    //   console.log(e)
    // }
  })

  xbee.on('orientation', async (orientation) => {
    // orientation = orientation
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

  // xbee.on('target', async (target) => {
  //   console.log('Target: ', target)
  //   client.emit('target', target.target)
  //   return socket.emit('target', target.target)
  // })
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
