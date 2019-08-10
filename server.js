var uniqid = require('uniqid')

var express = require('express')
var app = express()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}.`))


var originalBlocks = [
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
];

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
];

var players = {}

const genStartCoords = () => {
  return [1, 1]
}

const movePlayer = (id, dx, dy) => {
  blocks[players[id].y][players[id].x] = originalBlocks[players[id].y][players[id].x]
  players[id].x += dx
  players[id].y += dy
  blocks[players[id].y][players[id].x] = 2
}

// GET blocks 
app.get('/blocks', (req, res) => {
  res.status(200).json(blocks)
})

// GET all players
app.get('/players', (req, res) => {
  res.status(200).json(players)
})

// POST new player 
app.post('/players/:name/:char', (req, res) => {
  const id = uniqid()
  const startCoords = genStartCoords()
  players[id] = {
    name: req.params.name,
    facing: 'n',
    char: req.params.char, 
    x: startCoords[0], 
    y: startCoords[1]
  }
  movePlayer(id, startCoords[0], startCoords[1])
  // Sends back ID 
  res.status(200).json({
    id: id
  })
})

// DELETE player 
app.delete('/players/:id', (req, res) => {
  delete players[req.params.id]
  res.status(200).send(`DELETE request for id ${req.params.id} was successful.`)
})

// PATCH player position 
app.patch('/players/:id/:dx/:dy', (req, res) => {
  movePlayer(req.params.id, parseInt(req.params.dx, 10), parseInt(req.params.dy, 10))
  res.status(200).send(`PATCH request for id ${req.params.id} with dx: ${req.params.dx} and dy: ${req.params.dy} was successful.`)
})
