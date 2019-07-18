import { useState, useEffect} from 'react';
import io from 'socket.io-client';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';


import ChooseCharacter from '../choose_character';
import Calpocalypse from '../calpocalypse';
// const Calpocalypse = dynamic(() => import('../calpocalypse'), {
//     ssr: false
// });

const Game = (props) => {
    const [socket, setSocket] = useState(io());
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        socket.connect();
        return () => {socket.disconnect()};
    });
    
    if (character == null) {
        return (
            <div>
                <Calpocalypse socket={socket} />
                <ChooseCharacter onChooseCharacter={(char) => {setCharacter(char)}} />
            </div>
        );
    };

    socket.emit('newPlayer', character);

    return <Calpocalypse socket={socket} />;
};

export default Game;