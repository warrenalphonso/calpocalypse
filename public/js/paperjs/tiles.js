var tileSize = 25

socket.on('load', function(blocks, players) {
	for (var y = 0; y < blocks.length; y++) {
		for (var x = 0; x < blocks[y].length; x++) {
			var block = new Path.Rectangle(tileSize * x, tileSize * y, tileSize, tileSize)
			if (blocks[y][x] === 1) {
				block.fillColor = 'red'
			} else {
				block.fillColor = 'white'
			}
		}
	}

	for (id in players) {
		var player = players[id]
		var block = new Path.Rectangle(tileSize * player.x, tileSize * player.y, tileSize, tileSize)
		block.fillColor = 'black'
	}
})

socket.on('update', function(player, replaceBlock) {
	var block = new Path.Rectangle(tileSize * replaceBlock.x, tileSize * replaceBlock.y, tileSize, tileSize) 
	if (replaceBlock.block === 1) {
		block.fillColor = 'red'
	} else {
		block.fillColor = 'white'
	}

	var playerBlock = new Path.Rectangle(tileSize * player.x, tileSize * player.y, tileSize, tileSize) 
	playerBlock.fillColor = 'black'
})

socket.on('removePlayer', function(replaceBlock) {
	var block = new Path.Rectangle(tileSize * replaceBlock.x, tileSize * replaceBlock.y, tileSize, tileSize) 
	if (replaceBlock.block === 1) {
		block.fillColor = 'red'
	} else {
		block.fillColor = 'white'
	}
})