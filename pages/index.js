import React, {Component} from 'react'
import io from 'socket.io-client'
import Head from 'next/head'
import Link from 'next/link'

// const Index = () => (
//     <div>
//       <h3>This is the menu page</h3>
//       <Link href='/story'><h4>Story</h4></Link>
//       <Link href='/controls'><h4>Controls</h4></Link>
//       <Link href='/characters'><h4>Characters</h4></Link>
//       <Link prefetch href='/game'><h4>Game</h4></Link>
//     </div>
// )

// export default Index

class Test extends Component {
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

  componentDidMount() {
    const canvas = this.refs.canvas
    const context = canvas.getContext('2d')
    this.setState({
      canvas: canvas, 
      context: context
    })

    this.socket = io()
    this.socket.emit('new player')
    //not sure if this is the right place for this
    setInterval(() => {
      this.socket.emit('movement', this.state)
    }, 1000 / 60)
  }



  render() {
    return (
      <div>      
        <Head>
          <title>TEST</title>
        </Head>
        <h1>{this.state.hello}</h1>
        <canvas ref="canvas"></canvas>
        <style jsx> {`
          canvas {
            width: 800px;
            height: 600px; 
            border: 5px solid black;
          }
        `}
        </style>

      </div>
    )
  }
}

export default Test