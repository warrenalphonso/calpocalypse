import React, {Component} from 'react'
import io from 'socket.io-client'
import Head from 'next/head'
import Link from 'next/link'

import Game from '../green_dot_test'
import ChooseCharacter from '../choose_character'
//todo: convert class to functions, choose a character then screen changes to the game. 

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            character: null
        }
    }

    onChooseCharacter = (char) => {
        this.setState({
            character: char
        })
    }

    render() {
        if (this.state.character == null) {
            return <ChooseCharacter onChooseCharacter = {this.onChooseCharacter} />
        } else {
            return <Game />
        }
    }

}
  

export default App