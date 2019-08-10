import {moveLeft, moveRight, moveUp, moveDown} from './utils/movement.js'


/**
 * DEVELOPMENT: https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com 
 * (Using 'https://cors-anywhere.herokuapp.com/' is necessary to call a URL that isn't the one you're currently on)
 * 
 * Start http-server to test using: http-server -p 3000, then go to http://192.168.0.159:3000/index.html
 */
const port = 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com'

var id;
var name = 'Warren'
var char = 'EECS'

// Handle if Heroku dyno is down
// Remember I can use the header with the Fetch API in case I need it


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
 * DELETES PLAYER WHEN THEY LEAVE WEBPAGE.
 */
window.addEventListener('beforeunload', e => {
    e.returnValue = 'Stalling you so we can send an API DELETE request to kill your player :)'
    fetch(port + `/players/${id}`, {
        method: 'DELETE'
    })
    .then(resource => {
        if (!resource.ok) {
            throw new Error('DELETE player failed!')
        }
    }).catch(error => {
        console.log(error)
    })
})


/**
 * LISTENING FOR KEY PRESSES. Using e.code since it's case insensitive: 'a' || 'A' = 'KeyA'.
 */
document.addEventListener('keydown', e => {
    const code = e.code
    if (code === 'KeyA' || code === 'ArrowLeft') {
        moveLeft(port, id)
        console.log('left')
    } else if (code === 'KeyD' || code === 'ArrowRight') {
        moveRight(port, id)
        console.log('right')
    } else if (code === 'KeyW' || code === 'ArrowUp') {
        moveUp(port, id)
        console.log('up')
    } else if (code === 'KeyS' || code === 'ArrowDown') {
        moveDown(port, id)
        console.log('down')
    } else if (code === 'KeyE') {
        console.log('E is for use')
    } else if (code === 'KeyT') {
        console.log('T is for talk')
    } else if (code === 'Space') {
        console.log('Space is for attack')
    }
})

