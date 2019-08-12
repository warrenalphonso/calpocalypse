const herokuPort = 'https://cors-anywhere.herokuapp.com/https://calpocalypse.herokuapp.com'

/**
 * LOADING ANIMATION. Stops displaying #content and starts displaying #loading-screen. 
 * Redirects to 'calpocalypse.warrenalphonso.com/' when GET '/running' resolves. 
 */
window.onload = () => {
    const gameLink = document.getElementById('game')
    gameLink.onclick = () => {
        console.log('Serving up loading page')
        document.getElementById('content').style.display = 'none'
        document.getElementById('loading-screen').style.display = 'block'

        console.log('GETing "/running" to start dyno')
        fetch(herokuPort + '/running', {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Server broke!')
            } else {
                // Go to calpocalypse.warrenalphonso.com
                console.log('Success!!!!')
                console.log(res.json().message)
                window.location.assign('http://calpocalypse.warrenalphonso.com/')
            }
        })
    }
}