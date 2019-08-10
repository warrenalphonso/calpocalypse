// var p = new Path.Rectangle({width: 100, height: 100})
// var fillColors = ['black', 'red', 'blue', 'green']
// var index = 0, count = 0

update();
function update(){
    $.getJSON('https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com/blocks', function(data){
		blocks = data.blocks
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
		setTimeout(update, 1000)
        // index = data.currentFileTime % 1013 % fillColors.length
        // p.fillColor = fillColors[index]
        // if(++count < 20){
        //     setTimeout(update, 1500)
        // }
    })
}
