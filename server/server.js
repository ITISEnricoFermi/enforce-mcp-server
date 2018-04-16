require('./db/config/config.js')

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const socketIO = require('socket.io')
const path = require('path')
const ioClient = require('socket.io-client')
const { Arduino } = require('./deps/arduino')

const arduino = new Arduino(process.env.SERPORT || 'COM5')
const xbee = arduino.xbee

// Routes
const api = require('./routes/api')

const {
  mongoose
} = require('./db/mongoose')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000

// Routes
app.use('/api', api)

app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

const client = ioClient.connect('http://localhost:4000')

// Comunicazione con il sito
client.on('connect', () => {
  client.emit('data', {
    name: 'Test'
  })
})

// Comunicazione con il client
io.on('connection', (socket) => {
    console.log('connected')

    // TODO: parsing dei dati e divisione in singoli eventi a seconda del dato
    xbee.removeAllListeners('data')
    xbee.on("data", (data) => socket.emit("data", data))

    socket.on('left', (val) => {
        if (val) {
            console.log('Left motor started')
            arduino.left_motor_on()
        } else {
            console.log('Left motor stopped')
            arduino.left_motor_off()
        }
    })

    socket.on('right', (val) => {
        if (val) {
            console.log('Right motor started')
            arduino.right_motor_on()
        } else {
            console.log('Right motor stopped')
            arduino.right_motor_off()
        }
    })
})

server.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
