import React, { useState } from 'react'
import Head from 'next/head'

const ChooseCharacter = (props) => {
    const handleChange = (e) => {
        props.onChooseCharacter(e.target.value)
        console.log(`Clicked: state is ${e.target.value}`)

        //activate socket here?
    }

    return (
        <div>
            <Head>
                <title>Choose a character</title>
            </Head>
            <h2>Choose a character</h2>
            
            <input type="radio" name="character" value="eecs" onChange={handleChange} /> EECS <br />
            <input type="radio" name="character" value="mcb" onChange={handleChange} /> MCB <br />
            <input type="radio" name="character" value="econ" onChange={handleChange} /> Econ <br />
            <input type="radio" name="character" value="ms" onChange={handleChange} /> Media Studies <br />
        </div>
    )
}

export default ChooseCharacter