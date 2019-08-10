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
  [1,2,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
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

  socket.on('newPlayer', data => {
    console.log(data.name, data.char)
    const startCoords = genStartCoords()
    players[socket.id] = {
      name: data.name,
      char: data.char, 
      facing: 'n',
      x: startCoords[0], 
      y: startCoords[1]
    } 

    var numPlayersOnline = Object.keys(players).length 

    if (numPlayersOnline == 1) {
      // TODO: let first player type in seed 
      seed = Math.floor(Math.random() * 1000) 

      // TODO: build world by pseudorandomly creating array of blocks 
    }

    console.log(`Players online: ${numPlayersOnline}`)
  })

  // TEST THIS
  socket.on('disconnect', () => {
    delete players[socket.id]
  })
})

setInterval(() => {
  io.sockets.emit('state', {
    stateChanged: true, 
    blocks, 
    players,
  })
}, 1000 / 60)