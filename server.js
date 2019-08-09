var express = require('express');
var app = express();

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Server started on port ${port}.`));


app.get('/api', (req, res) => {
  res.status(200).json({
    api: 'version 1', 
    blah: 'yo', 
    numbers: 235});
});

app.get('/movement', (req, res) => {
  res.status(200).json({
    movedLeft: 'yes'
  })
})




var players = {}

// GET all players
app.get('/players', (req, res) => {
  res.status(200).json(players)
})

// POST new player 
app.post('/players/:id', (req, res) => {
  res.status(200).send(`POST request to make a new player with id: ${res.params.id}`)
})