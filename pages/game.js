import { useState, useEffect} from 'react';
import io from 'socket.io-client';
import Head from 'next/head';
import Link from 'next/link';

import ChooseCharacter from '../choose_character';
import Calpocalypse from '../calpocalypse';

const Game = (props) => {
    const [socket, setSocket] = useState(io());
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        socket.connect();
        return () => {socket.disconnect()};
    });
    
    if (character == null) {
        return <ChooseCharacter onChooseCharacter={(char) => {setCharacter(char)}} />;
    };

    socket.emit('newPlayer', character);

    return <Calpocalypse socket={socket} />;
};

export default Game;