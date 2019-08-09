// Using 'https://cors-anywhere.herokuapp.com/' is necessary to call a URL that isn't the one you're currently on
const port = 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com'

var id;
var name = 'skeleton man'
var char = 'EECS'

// Apparently XMLHttpRequests can only have .send() called once?
// Handle if Heroku dyno is down

// Get player ID 
var createPlayer = new XMLHttpRequest() 
createPlayer.open('POST', port + `/players/${name}/${char}`, true)
createPlayer.onload = () => {
    id = JSON.parse(createPlayer.response).id
    if (createPlayer.status === 201) {
        console.log(id)
    } else {
        console.log('Error POSTing new player. ')
    }
}
createPlayer.send()

/** 
 * MOVEMENT. The following functions create XMLHttpRequests to PATCH player movement. Finally there are two listeners for wasd or arrow keys.  
 **/
const moveLeft = () => {
    var left = new XMLHttpRequest()
    left.open('PATCH', port + `/players/${id}/-1/0`, true)
    // left.onload = () => {
    //     console.log(left.response)
    // }
    left.send()
}

const moveRight = () => {
    var right = new XMLHttpRequest()
    right.open('PATCH', port + `/players/${id}/1/0`, true)
    // right.onload = () => {
    //     console.log(right.response)
    // }
    right.send()
}

const moveUp = () => {
    var up = new XMLHttpRequest()
    up.open('PATCH', port + `/players/${id}/0/1`, true)
    // up.onload = () => {
    //     console.log(up.response)
    // }
    up.send()
}

const moveDown = () => {
    var down = new XMLHttpRequest()
    down.open('PATCH', port + `/players/${id}/0/-1`, true)
    // down.onload = () => {
    //     console.log(down.response)
    // }
    down.send()
}

// Using e.code since it's case insensitive: 'a' || 'A' = 'KeyA'
document.addEventListener('keydown', e => {
    const code = e.code
    if (code === 'KeyA' || code === 'ArrowLeft') {
        moveLeft()
        console.log('left')
    } else if (code === 'KeyD' || code === 'ArrowRight') {
        moveRight()
        console.log('right')
    } else if (code === 'KeyW' || code === 'ArrowUp') {
        moveUp()
        console.log('up')
    } else if (code === 'KeyS' || code === 'ArrowDown') {
        moveDown()
        console.log('down')
    }
})

/**
 * DELETES PLAYER WHEN THEY LEAVE WEBPAGE.
 */
window.onbeforeunload = () => {
    var deletePlayer = new XMLHttpRequest() 
    deletePlayer.open('DELETE', port + `/players/${id}`, true)
    deletePlayer.send()
    return "Deleting player..."
}