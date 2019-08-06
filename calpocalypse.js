import React, { useState, useEffect } from 'react'; 

/** Master component for Rendering everything */
const Calpocalypse = (props) => {
    /**
     * Props has 
     *  - socket: io() instance 
     *  - start: boolean, whether or not player has chosen character
     */
    const socket = props.socket;
   
    const canvasRef = React.createRef();
    /** PROBLEM: CANVAS IS UNDEFINED ON SERVER-SIDE RENDERING. The following is low-quality; use Paper.js */

    /** This draws everything for the client */
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        var actions = {
            movement: {
                x: null, 
                y: null
            }, 
            //other stuff... 
        }

        document.addEventListener('keydown', function(event) {
            if (actions.movement.x == null && actions.movement.y == null) {
                return;
            }
            switch (event.keyCode) {
              case 65: // A
                actions.movement.x -= 1;
                break;
              case 87: // W
                actions.movement.y += 1;
                break;
              case 68: // D
                actions.movement.x += 1;
                break;
              case 83: // S
                actions.movement.y -= 1;
                break;
            }
          });           

        socket.on('state', (data) => {
            //const myPlayer = players[socket.id];

            // Draw tiles - make this into a function 
            var blocks = data.blocks;
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

            // Draw players on top of blocks 
            var players = data.players;
            //actions.movement.x = players[socket.id].x;
            //actions.movement.y = players[socket.id].y;
            var parray = Object.values(players);
            // parray is an array of objects so for ... in gives index of each object not the object itself 
            for (var pindex in parray) {
                var player = parray[pindex];
                context.fillStyle = "rgba(0, 255, 0, 0.6)"; 
                context.fillRect(
                    player.y * tileSize, player.x * tileSize, tileSize, tileSize
                );
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