import React from 'react'
import Link from 'next/link'

const Index = () => (
    <div>
      <h3>This is the menu page</h3>
      <Link href='/story'><h4>Story</h4></Link>
      <Link href='/controls'><h4>Controls</h4></Link>
      <Link href='/characters'><h4>Characters</h4></Link>
      <Link prefetch href='/game'><h4>Game</h4></Link>
    </div>
)

export default Index