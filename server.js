const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000; //process.env.PORT is for heroku
const app = next({dev})
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const server = express()
        server.set('port', port)

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) throw err
            console.log(`Ready on port: ${port}`)
        })
    })
    .catch(ex => {
        console.log(ex.stack)
        process.exit(1)
    })