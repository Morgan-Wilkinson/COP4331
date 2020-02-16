import React, { Component } from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import MD5 from '../../backend/js/md5'

import { Button, Form, InputGroup, Col } from 'react-bootstrap'
import { Container } from 'react-bootstrap';


export class SignUp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: ""
        };
    }
    
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    // This code is an event handler that will take the form data and transform it into a JSON
    // to send.
    registerData = (event) => {
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

        var url = urlBase + '/SignUp.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(json);
            var jsonObject = JSON.parse( xhr.responseText );
        } catch (error) {}
    }
    

    render() {
        const schema = yup.object({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            username: yup.string().required(),
            password: yup.string().required(),
        });

        return (
            <div>
                <Container>
                    <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                    }}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        /*First Name form data*/
                        <Form id="myForm" onSubmit={this.registerData}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.changeHandler}
                                inputRef={(input) => {this.inputFirstname = input}}
                                isValid={touched.firstName && !errors.firstName}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        
                        {/*Last Name form data*/}
                            <Form.Group as={Col} md="4" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.changeHandler}
                                isValid={touched.lastName && !errors.lastName}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            </Form.Row> {/*End of Row*/}

                            <Form.Row>
                            {/*User Name form data*/}
                            <Form.Group as={Col} md="4" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                name="username"
                                value={this.state.username}
                                onChange={this.changeHandler}
                                isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.username}
                                </Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>

                            {/*Password form data*/}
                            <Form.Group as={Col} md="4" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"><span>🔑</span></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                type="password"
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                name="password"
                                value={this.state.password}
                                onChange={this.changeHandler}
                                isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.password}
                                </Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>

                            </Form.Row>  {/*End of Row*/}
                        
                        <Button type="submit">Register</Button>
                        </Form>
                    )}
                    </Formik>
                </Container>
            </div>
        )
    }
}

export default SignUp
