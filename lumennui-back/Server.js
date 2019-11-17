const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const chatRoute = require('./routes/chat-route')
const userRoute = require('./routes/user-route')

const port = 9500

const app = express()
app.use(chatRoute)
app.use(userRoute)

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', socket => {
    console.log('New client connected')

    socket.on('message', (message) => {
        io.sockets.emit('broadcast', message)
        console.log('Message = : ', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))