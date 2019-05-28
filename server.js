// Dependencies.
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000; //process.env.PORT is for heroku

const app = express();
const server = http.Server(app);
const io = socketIO(server);

var routing = require('./menu/routing')

app.set('port', port);
app.use('/static', express.static(__dirname + '/static'));

// Routing main page (the green dots test)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Routing menu page
// app.get('/menu', (req, res) => {
//   res.sendFile(path.join(__dirname, 'menu/menu.html'));
// })
app.use('/menu', routing)

//Routing game page 
app.get('/game', (req, res) => {

})

server.listen(port, function() {
  console.log(`Starting server on port ${port}`);
});

var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });

  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60); //60 updates per second
