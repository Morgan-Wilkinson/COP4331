import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Place as Router, Switch } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { Container } from 'react-bootstrap';
import MD5 from '../../backend/js/md5'

import ContactList from './ContactList.js';

export class SignIn extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            login: "",
            password: ""
        };
    }
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    // Sends data to signin
    sendLogin = (event) => {
        var urlBase = 'http://cop4331-project.com/API';
        // Stops form submission if the form is empty or in default state.
        event.preventDefault();

        // Retrieves the form this is below in the render.
        let myForm = document.getElementById('myForm');
        let formData = new FormData(myForm);
        var object = {};
        // Assigns the appropriate value and key for each item in the form.
        formData.forEach((value, key) => {object[key] = value});
        object["password"] = MD5(object["password"]);
        // Creates Json
        var json = JSON.stringify(object); 
        this.setState({xvalue: json});
        
        var url = urlBase + '/Login.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false); // Had to set to false
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(json);
            
            var jsonObject = JSON.parse( xhr.responseText );
            if (jsonObject.ID != 0){
                var loggedIn = jsonObject.ID
                localStorage.setItem('userLogged', loggedIn)
                window.location.href = '/contacts'
            }
        } catch (error) {}
    }

    render() {
        return (
            <div>
                <Container>
                    <Form id="myForm" noValidate onSubmit={this.sendLogin}>
                        <Form.Group controlId="login">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Username" 
                            name="login"
                            value={this.state.login}
                            onChange={this.changeHandler}
                            inputRef={(input) => {this.inputLogin = input}}
                            />
                            <Form.Text className="text-muted">
                            It's nice to see you again!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.changeHandler}
                            inputRef={(input) => {this.inputPassword = input}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default SignIn
