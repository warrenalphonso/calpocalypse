import {Component} from 'react'
import io from 'socket.io-client'
import Head from 'next/head'
import Link from 'next/link'

const Index = (props) => (
    <div>
      <Head>
        <title>Menu</title>
      </Head>
      <h3>This is the menu page</h3>
      <Link href='/story'><h4>Story</h4></Link>
      <Link href='/controls'><h4>Controls</h4></Link>
      <Link href='/characters'><h4>Characters</h4></Link>
      <Link href='/game'><h4>Game</h4></Link>
      <Link href='/testgame'><h2>Test</h2></Link>
    </div>
)

export default Index