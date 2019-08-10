var socket = io() 

socket.emit('newPlayer', {
    name: 'Warren', 
    char: 'EECS'
})

/** 
 * MOVEMENT. The following functions create Fetch API requests to PATCH player movement. 
 * Compatible with WASD or arrow keys.  
 **/

document.addEventListener('keydown', e => {
    const code = e.code
    if (code === 'KeyA' || code === 'ArrowLeft') {
        console.log('left')
    } else if (code === 'KeyD' || code === 'ArrowRight') {
        console.log('right')
    } else if (code === 'KeyW' || code === 'ArrowUp') {
        console.log('up')
    } else if (code === 'KeyS' || code === 'ArrowDown') {
        console.log('down')
    } else if (code === 'KeyE') {
        console.log('E is for use')
    } else if (code === 'KeyT') {
        console.log('T is for talk')
    } else if (code === 'Space') {
        console.log('Space is for attack')
    }
})

// data has stateChanged, blocks, players
// socket.on('state', data => {
//     console.log(data.stateChanged)
// })