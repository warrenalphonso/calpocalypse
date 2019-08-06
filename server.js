var express = require('express');
var app = express();

var http = require('http');
var socketIO = require('socket.io');
var server = http.Server(app);
var io = socketIO(server);

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Server started on port ${port}.`));

app.get('/api', (req, res) => {
  res.status(200).json({api: 'version 1', blah: 'yo', numbers: 235});
});
