import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Story = () => (
    <div>
        <Head>
            <title>Story</title>
        </Head>
        <h1>Story</h1>
        <Link href='/'><h4>Back to menu</h4></Link>
    </div>
)

export default Story