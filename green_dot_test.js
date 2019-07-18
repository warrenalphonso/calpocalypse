import React, {Component} from 'react'
import io from 'socket.io-client'
import Head from 'next/head'
import Link from 'next/link'



class GreenDot extends Component {
    constructor(props) {
      super(props)
      this.state = {
        movement: {
          up: false, 
          down: false, 
          left: false, 
          right: false  
        }, 
        canvas: null, 
        context: null
      }
    }
  
    handleKeyDown = (event) => {
      switch (event.keyCode) {
        case 65: // A
          this.state.movement.left = true;
          break;
        case 87: // W
          this.state.movement.up = true;
          break;
        case 68: // D
          this.state.movement.right = true;
          break;
        case 83: // S
          this.state.movement.down = true;
          break;
      }  
    }
  
    handleKeyUp = (event) => {
      switch (event.keyCode) {
        case 65: // A
          this.state.movement.left = false;
          break;
        case 87: // W
          this.state.movement.up = false;
          break;
        case 68: // D
          this.state.movement.right = false;
          break;
        case 83: // S
          this.state.movement.down = false;
          break;
      }
    }
  
    componentDidMount() {
      const canvas = this.refs.canvas
      canvas.width = 800 
      canvas.height = 600
      const context = canvas.getContext('2d')
      this.setState({
        canvas: canvas, 
        context: context
      })
  
      document.addEventListener('keydown', this.handleKeyDown)
      document.addEventListener('keyup', this.handleKeyUp)
  
      this.socket = io()
      this.socket.emit('new player')
  
      //not sure if this is the right place for this
      setInterval(() => {
        this.socket.emit('movement', this.state.movement)
      }, 1000 / 60)
  
      this.socket.on('state', (players) => {
        // console.log('players: ')
        // console.log(players)
        this.state.context.clearRect(0, 0, 800, 600) 
        this.state.context.fillStyle = 'green' 
        for (var id in players) {
          var player = players[id] 
          console.log('a player')
          this.state.context.beginPath() 
          this.state.context.arc(player.x, player.y, 10, 0, 2 * Math.PI) 
          this.state.context.fill()
        }
      })
    }
  
    render() {
      return (
        <div>      
          <Head>
            <title>Game</title>
          </Head>
          <h1>Game</h1>
          <Link href='/'><h4>Menu</h4></Link>
  
          <canvas ref="canvas"></canvas>
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
  }

export default GreenDot