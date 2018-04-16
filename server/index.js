const express = require('express')
const app = express()
const { Arduino } = require('./deps/arduino')

app.set('port', process.env.PORT || 3000)

const arduino = new Arduino(process.env.SERPORT || 'COM5')
const xbee = arduino.xbee;

//Launch server
const http = require('http').Server(app)
http.listen(app.get('port'), () => {
    console.log(`Listening on port: ${app.get('port')}`)
})

//Handle socketio
const io = require('socket.io')(http)
io.on('connection', function(socket) {
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