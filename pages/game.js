import {useState} from 'react'
import io from 'socket.io-client'
import Head from 'next/head'
import Link from 'next/link'

import GreenDot from '../green_dot_test'
import ChooseCharacter from '../choose_character'

const Game = (props) => {
    const [character, setCharacter] = useState(null)

    const onChooseCharacter = (char) => {
        setCharacter(char)
    }

    if (character == null) {
        return <ChooseCharacter onChooseCharacter = {onChooseCharacter} />
    } else {
        return <GreenDot />
    }
}

export default Game