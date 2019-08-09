// Change to 'localhost:3000' when testing and 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com' when not 
const port = 'https://cors-anywhere.herokuapp.com/https://calpocalypse-backend.herokuapp.com'


// Apparently XMLHttpRequests can only have .send() called once?
// Create a request variable and assign a new XMLHttpRequest object 
var request = new XMLHttpRequest() 

// Open a new connection, using GET; Using 'https://cors-anywhere.herokuapp.com/' is necessary to call a URL that isn't the one you're currently on
request.open('GET', port + '/api', true)

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


// Using event.code since it's case insensitive: 'a' || 'A' = 'KeyA'
document.addEventListener('keydown', event => {
    const code = event.code 

    if (code === 'KeyA') {
        movementRequest.open('GET', port + '/movement', true)
        movementRequest.onload = function() {
            var data = JSON.parse(this.response) 
            if (request.status >= 200 && request.status < 400) {
                console.log(data)
            }
        }
        movementRequest.send()
    }
})

var testRequest = new XMLHttpRequest()
testRequest.open('POST', port + '/user/joe', true) 
testRequest.onload = function() {
    var data = this.response 
    console.log(data) 
}
testRequest.send()
