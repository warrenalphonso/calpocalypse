// Using 'https://cors-anywhere.herokuapp.com/' is necessary to call a URL that isn't the one you're currently on
const port = 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com'

var id;
var name = 'Warren'
var char = 'EECS'

// Apparently XMLHttpRequests can only have .send() called once?
// Handle if Heroku dyno is down


/**
 * GET PLAYER ID. Need to test error. 
 */
fetch(port + `/players/${name}/${char}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('POST failed!')
        }
        return response.json()
    })
    .then(data => {
        id = data.id 
        console.log(id)
    }).catch(error => {
        console.error(error)
    })


/** 
 * MOVEMENT. The following functions create XMLHttpRequests to PATCH player movement. Finally there are two listeners for wasd or arrow keys.  
 **/
const moveLeft = () => {
    fetch(port + `players/${id}/-1/0`, {
            method: 'PATCH'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('PATCH for moving left failed!')
            }
        }).catch(error => {
            console.log(error)
        })
}

const moveRight = () => {
    fetch(port + `players/${id}/1/0`, {
            method: 'PATCH'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('PATCH for moving right failed!')
            }
        }).catch(error => {
            console.log(error)
        })
}

const moveUp = () => {
    fetch(port + `players/${id}/0/1`, {
        method: 'PATCH'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('PATCH for moving up failed!')
        }
    }).catch(error => {
        console.log(error)
    })
}

const moveDown = () => {
    fetch(port + `players/${id}/0/-1`, {
        method: 'PATCH'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('PATCH for moving down failed!')
        }
    }).catch(error => {
        console.log(error)
    })
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