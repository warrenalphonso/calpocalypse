const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000; //process.env.PORT is for heroku
const app = next({dev})
const handle = app.getRequestHandler()
const server = express()

app
    .prepare()
    .then(() => {
        server.set('port', port)

        server.get('*', (req, res) => {
            return handle(req, res)
        }) 

        server.listen(port, err => {
            if (err) throw err
            console.log(`Ready on port: ${port}`)
        })
    })
    .catch(ex => {
        console.log(ex.stack)
        process.exit(1)
    })

const http = require('http')
const io = require('socket.io')(http.Server(server))
var players = {}
io.on('connection', (socket) => {
    console.log('hello')
    socket.on('new player', () => {
        players[socket.id] = {
            x: 300, 
            y: 300
        }
    })

    socket.on('movement', (data) => {
        var player = players[socket.id] || {}
        if (data.left) {
            player.x -= 5
        } 
        if (data.up) {
            player.y -= 5
        }
        if (data.right) {
            player.x += 5
        }
        if (data.down) {
            player.y += 5
        }
    })
})

setInterval(() => {
    io.sockets.emit('state', players)
}, 1000 / 60) //60 fps
