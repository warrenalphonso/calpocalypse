var uniqid = require('uniqid')

var express = require('express')
var app = express()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}.`))


var players = {}

const genStartCoords = () => {
  return [0, 0]
}

// GET all players
app.get('/players', (req, res) => {
  res.status(200).json(players)
})

// POST new player 
// !! Make sure to generate a random, unique ID or players can be overwritten !!
app.post('/players/:name/:char', (req, res) => {
  const id = uniqid()
  const startCoords = genStartCoords()
  players[id] = {
    name: req.params.name,
    char: req.params.char, 
    x: startCoords[0], 
    y: startCoords[1]
  }
  // Sends back ID 
  res.status(201).json({
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
  players[req.params.id].x += parseInt(req.params.dx, 10)
  players[req.params.id].y += parseInt(req.params.dy, 10)
  res.status(200).send(`PATCH request for id ${req.params.id} with dx: ${req.params.dx} and dy: ${req.params.dy} was successful.`)
})
