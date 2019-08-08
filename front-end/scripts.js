// Create a request variable and assign a new   XMLHttpRequest object 
var request = new XMLHttpRequest() 

// Open a new connection, using GET; Using 'https://cors-anywhere.herokuapp.com/' is necessary to call a URL that isn't the one you're currently on
request.open('GET', 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com/api', true)

request.onload = function() {
    // Begin accessing JSON here. Use JSON.parse() to convert to JS object. 
    var data = JSON.parse(this.response) 
    
    if (request.status >= 200 && request.status < 400) {
        console.log(data)
    } else {
        // Would it error if Heroku dyno is down?
        console.log('error')
    }
}

// Send the request
request.send()





var movementRequest = new XMLHttpRequest() 

movementRequest.open('GET', 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com/movement', true) 

movementRequest.onload = function() {
    var data = JSON.parse(this.response) 

    if (request.status >= 200 && request.status < 400) {
        console.log(data)
    }
}

// Using event.code since it's case insensitive: 'a' || 'A' = 'KeyA'
document.addEventListener('keydown', event => {
    const code = event.code 

    if (code === 'keyA') {
        movementRequest.send()
    }
})