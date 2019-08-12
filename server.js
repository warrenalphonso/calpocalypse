var path = require('path')
var express = require('express')
var app = express()

const port = process.env.PORT || 3000
var http = require('http')
var server = http.createServer(app)

var io = require('socket.io')(server) 

app.use(express.static(path.join(__dirname, 'public')))

app.get('/running', (req, res) => {
  res.status(200)
})

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public/game.html'))
})

server.listen(port, err => {
  if (err) throw err
  console.log(`Server started on port ${port}.`)
})









var seed;

var players = {}

var blocks = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

const genStartCoords = () => {
  return [1, 1]
}

// Executes when someone connects to server 
io.on('connection', socket => {
  console.log('New socket connected') 

  socket.on('newPlayer', (name, char) => {
    console.log(name, char)
    const startCoords = genStartCoords()
    players[socket.id] = {
      name: name,
      char: char, 
      facing: 'n',
      x: startCoords[0], 
      y: startCoords[1]
    } 
    io.sockets.emit('load', blocks, players)

    var numPlayersOnline = Object.keys(players).length 

    if (numPlayersOnline == 1) {
      // TODO: let first player type in seed 
      seed = Math.floor(Math.random() * 1000) 

      // TODO: build world by pseudorandomly creating array of blocks 
    }

    console.log(`Players online: ${numPlayersOnline}`)
  })

  socket.on('movement', (dx, dy) => {
    var replaceBlock = {
      x: players[socket.id].x, 
      y: players[socket.id].y,
      block: blocks[players[socket.id].y][players[socket.id].x]
    }
    players[socket.id].x += dx 
    players[socket.id].y += dy
    io.sockets.emit('update', players[socket.id], replaceBlock)
  })

  // TEST THIS
  socket.on('disconnect', () => {
    var replaceBlock = {
      x: players[socket.id].x, 
      y: players[socket.id].y, 
      block: blocks[players[socket.id].y][players[socket.id].x]
    }
    io.sockets.emit('removePlayer', replaceBlock)
    delete players[socket.id]
  })
})