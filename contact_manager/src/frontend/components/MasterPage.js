import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Button, ButtonToolbar } from 'react-bootstrap';

export class MasterPage extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome to Hive Mind!</h1>
                    <p>
                        Need a place to store your exploding contact list? Well you've come to the right place!
                        If you're new here go start building your Hive! If you're returning welcome back! 
                    </p>
                    <p>
                        Well why are you still here? Go manage your Hive!
                    </p>

                    <ButtonToolbar>
                        <Button href="/signup" variant="primary" className="mr-sm-2">Sign Up</Button> 
                        <Button href="/signin" variant="primary" className="mr-sm-2">Sign In</Button>
                    </ButtonToolbar>
                </Jumbotron>
            </div>
        )
    }
}

export default MasterPage
