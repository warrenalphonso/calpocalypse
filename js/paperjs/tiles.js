update();

function update(){
    $.getJSON('https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com/blocks', function(data){
		blocks = data
		for (var y = 0; y < blocks.length; y++) {
			for (var x = 0; x < blocks[y].length; x++) {
				var block = new Path.Rectangle(50* x, 50 * y, 50, 50)
				if (blocks[y][x] === 1) {
					block.fillColor = 'red'
				} else if (blocks[y][x] === 2) {
					block.fillColor = 'black'
				}
			}
		}
		// setTimeout(update, 1500)
    })
}
