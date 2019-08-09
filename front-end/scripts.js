// Change to 'localhost:3000' when testing and 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com' when not 
const port = 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com'

// // Apparently XMLHttpRequests can only have .send() called once?
// // Create a request variable and assign a new XMLHttpRequest object 
// var request = new XMLHttpRequest() 
// // Open a new connection, using GET; Using 'https://cors-anywhere.herokuapp.com/' is necessary to call a URL that isn't the one you're currently on
// request.open('GET', port + '/api', true)
// request.onload = function() {
//     // Begin accessing JSON here. Use JSON.parse() to convert to JS object. 
//     var data = JSON.parse(this.response) 
//     if (request.status >= 200 && request.status < 400) {
//         console.log(data)
//     } else {
//         // Would it error if Heroku dyno is down?
//         console.log('error')
//     }
// }
// // Send the request
// request.send()


// Get player ID 
var id;

var createPlayer = new XMLHttpRequest() 
createPlayer.open('POST', port + `/players/warren/eecs`, true)
createPlayer.load = () => {
    id = JSON.parse(createPlayer.response).id
}
createPlayer.send()


// Using e.code since it's case insensitive: 'a' || 'A' = 'KeyA'
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
    }
})