import React, { useState, useEffect } from 'react'; 

/** Master component for Rendering everything */
const Calpocalypse = (props) => {
    //props has socket 
    const socket = props.socket;

    useEffect(() => {
        socket.on('playerState', (players) => {
            const myPlayer = players[socket.id];

            // render only around a certain player 
            // renderPlayerView(myPlayer)
        })
    })


















    const canvasRef = React.createRef();

    var map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ];
      
    
    // use effects maybe? 
    const w = window.innerWidth; 
    const h = window.innerHeight;

    useEffect(() => {
        const tileSize = 16;
        const canvas = canvasRef.current;
        canvas.width = w + "px"; 
        canvas.height = h + "px";  
        const context = canvas.getContext('2d');
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, w, h);
        context.fillStyle = 'rgba(255, 0, 0, 1)';
        
        for (var i = 0; i < map.length; i += 1) {
            for (var j = 0; j < map[i].length; j += 1) {
                if (map[i][j] !== 0) {
                    context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize)
                }
            }
        }
    })

    return (
        <div>
            <canvas ref={canvasRef} />
            <style jsx> {`
                body {
                    overflow: hidden;
                    background: blue;
                }            
                canvas {
                    width: ${w + "px"}; 
                    height: ${h + "px"};  
            
                    border: 10px solid black;
                }
            `} </style>

        </div>
    )
}

export default Calpocalypse;