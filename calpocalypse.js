import React, { useState, useEffect } from 'react'; 

/** Master component for Rendering everything */
const Calpocalypse = (props) => {
    //props has socket 
    const socket = props.socket;
   
    const canvasRef = React.createRef();
    /** PROBLEM: CANVAS IS UNDEFINED ON SERVER-SIDE RENDERING. The following is low-quality; use Paper.js */
    /** This draws everything for the client */
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        var actions = {
            movement: {
                up: false, 
                down: false, 
                left: false, 
                right: false
            }, 
            //other stuff... 
        }

        socket.on('state', (blocks) => {
            //const myPlayer = players[socket.id];

            // Draw tiles - make this into a function 
            const tileSize = 8;
            context.clearRect(0, 0, canvas.width, canvas.length);
            context.fillStyle = "rgba(255, 0, 0, 0.6)";
            for (var x = 0; x < blocks.length; x += 1) {
                for (var y = 0; y < blocks[0].length; y += 1) {
                    if (blocks[x][y]) {
                        context.fillRect(
                            y * tileSize, x * tileSize, tileSize, tileSize
                        );
                    }
                }
            }

            // render only around a certain player 
            // renderPlayerView(myPlayer)
        });

        setInterval(() => {
            socket.emit('actions', actions);
        }, 1000 / 60);
    });

    //Replace script tag below: 
    // <script type="text/paperscript" canvas="canvas"> 
    //     {console.log("hello?")};
    // </script>
    // <script type="text/javascript" src="/static/paper-full.js"></script>
    return (
        <div>
            <canvas ref={canvasRef} id="myCanvas" resize="true" />
            <style global jsx>{`
                html, 
                body {
                    height: 100%;
                } 

                canvas[resize] {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    )
}

export default Calpocalypse;