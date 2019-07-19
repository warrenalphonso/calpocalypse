const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;

// each player is id: character, x coordinate, y coordinate attributes
var players = {};

var seed = null;
var blocks = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
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
var mobs ={};

// this executes right when someone connects to any page
io.on('connection', (socket) => {
  // set up player when they join game
  socket.on('newPlayer', (character) => {
    players[socket.id] = {
      character: character, 
      x: 10, 
      y: 10 
    };

    var numPlayersOnline = Object.keys(players).length;

    if (numPlayersOnline == 1) {
      // Choose a random seed - maybe let player type in a seed later 
      seed = Math.floor(Math.random() * 1000);

      // TODO: Build world now by randomly creating an array of blocks, then emit that array?
    };

    console.log(`Players online: ${numPlayersOnline}`)
  });

  // remove player when they leave, wait this gets called too early fix it
  socket.on('disconnect', () => {
    //delete players[socket.id];
  });
});

// update players 
//TODO: -- how/when to update players, blocks, mobs 
setInterval(() => {
  io.sockets.emit('state', {
    blocks: blocks, 
    players: players
  });
}, 1000 / 60);




nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
      return nextHandler(req, res);
  });

  server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Ready on port: ${port}`);
  });
});