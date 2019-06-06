import React, {Component} from 'react' 
import Head from 'next/head'

class ChooseCharacter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            charChosen: null
        }
    }

    radioClicked = (e) => {
        this.setState({
            charChosen: e.currentTarget.value
        })
        console.log(`clicked: state is ${e.currentTarget.value}`)
    }

    handleChange = (e) => {
        this.props.onChooseCharacter(e.target.value)
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Choose a character</title>
                </Head>
                <h2>Choose a character</h2>
                
                <input type="radio" name="character" value="eecs" onChange={this.handleChange} /> EECS <br />
                <input type="radio" name="character" value="mcb" onChange={this.handleChange} /> MCB <br />
                <input type="radio" name="character" value="econ" onChange={this.handleChange} /> Econ <br />
                <input type="radio" name="character" value="ms" onChange={this.handleChange} /> Media Studies <br />

            </div>
        )

    }
}

export default ChooseCharacter