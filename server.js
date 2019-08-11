var uniqid = require('uniqid')

var path = require('path')
var express = require('express')
var app = express()

const port = process.env.PORT || 3000
var http = require('http')
var server = http.createServer(app)

var io = require('socket.io')(server) 

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.status(200).sendFile('./index.html')
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
    io.sockets.emit('state', blocks, players)

    var numPlayersOnline = Object.keys(players).length 

    if (numPlayersOnline == 1) {
      // TODO: let first player type in seed 
      seed = Math.floor(Math.random() * 1000) 

      // TODO: build world by pseudorandomly creating array of blocks 
    }

    console.log(`Players online: ${numPlayersOnline}`)
  })

  socket.on('movement', (dx, dy) => {
    players[socket.id].x += dx 
    players[socket.id].y += dy
    io.sockets.emit('state', blocks, players)
  })

  // TEST THIS
  socket.on('disconnect', () => {
    console.log('bye')
    delete players[socket.id]
    io.sockets.emit('state', blocks, players)
  })
})

// setInterval(() => {
//   io.sockets.emit('state', true, blocks, players)
// }, 1000 / 60)