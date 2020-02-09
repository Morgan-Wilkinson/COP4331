import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

export class About extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Meet the Team!</h1>
                    <p>
                        Morgan Wilkinson: Frontend developer
                        Cody Oliver: Backend developer
                        Jared Neumann: API
                        Jace Mixon
                        Rodlin Dorvilus
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

export default About
