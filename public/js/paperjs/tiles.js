// update();

// function update(){
//     $.getJSON('https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com/blocks', function(data){
// 		blocks = data
// 		for (var y = 0; y < blocks.length; y++) {
// 			for (var x = 0; x < blocks[y].length; x++) {
// 				var block = new Path.Rectangle(50* x, 50 * y, 50, 50)
// 				if (blocks[y][x] === 1) {
// 					block.fillColor = 'red'
// 				} else if (blocks[y][x] === 2) {
// 					block.fillColor = 'black'
// 				}
// 			}
// 		}
// 		// setTimeout(update, 1500)
//     })
// }

// var blocks = [
// 	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
// 	[1,2,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
// 	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
// 	[1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
// 	[1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
// 	[1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
// 	[1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],
// 	[1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
// 	[1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
// 	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
// 	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
//   ];

  


// socket.on('state', data => {
//     // console.log(data.stateChanged)
// })

// var sessionId = io.socket.sessionid

// io.on('hi', () => {
// 	var id = 'hi'
// })

function update() {
	var blocks = globals.blocks 
	for (var y = 0; y < blocks.length; y++) {
		for (var x = 0; x < blocks[y].length; x++) {
			var block = new Path.Rectangle(50 * x, 50 * y, 50, 50)
			if (blocks[y][x] === 1) {
				block.fillColor = 'red'
			} else {
				block.fillColor = 'white'
			}
		}
	}
	var players = globals.players 
	for (id in players) {
		var player = players[id]
		var block = new Path.Rectangle(50 * player.x, 50 * player.y, 50, 50)
		block.fillColor = 'black'
	}
	setTimeout(update, 1000 / 60)
}



update()