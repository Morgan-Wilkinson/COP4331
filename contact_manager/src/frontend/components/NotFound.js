import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { Container } from 'react-bootstrap';

export class NotFound extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid>
                <Container>
                    <h1>Abyss of Nothingness</h1>
                    <p>
                        Here is the infinity abyss of nothingness. The void sends it's greetings.
                    </p>
                </Container>
                </Jumbotron>
            </div>
        )
    }
}

export default NotFound
