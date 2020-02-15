import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

export class About extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Meet the Team!</h1>

                    <p>Morgan Wilkinson: Frontend developer</p>
                    <p>Cody Oliver: Backend developer</p>
                    <p>Jared Neumann: Backend developer</p>
                    <p>Jace Mixon: Backend developer</p>
                    <p>Rodlin Dorvilus: Frontend developer</p>
                </Jumbotron>
            </div>
        )
    }
}

export default About
