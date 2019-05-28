const express = require('express')
const path = require('path');
const router = express.Router()

//Menu page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/menu.html'))
})

//Routing story page 
router.get('/story', (req, res) => {
    res.send('Story')
})

//Routing controls page 
router.get('/controls', (req, res) => {
    res.send('Controls')
})

//Routing character info page
router.get('/characters', (req, res) => {
    res.send('Characters')
})

module.exports = router