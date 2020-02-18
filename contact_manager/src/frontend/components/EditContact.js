import React, { Component } from 'react'
import Edit from "./edit.jpg";
import { Form, InputGroup } from 'react-bootstrap';
import { Button, Popover, OverlayTrigger, Container, ButtonToolbar, Col } from 'react-bootstrap';

export class EditContact extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: this.props.contacts[0],
            lastName: this.props.contacts[1],
            email: this.props.contacts[2],
            phoneNumber: this.props.contacts[3],
            ID: localStorage.getItem('userLogged')
        };
        
    }
    
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    // This code is an event handler that will take the form data and transform it into a JSON
    // to send.
    editData = (event) => {
        var urlBase = 'http://cop4331-project.com/API';
        // Stops form submission if the form is empty or in default state.
        event.preventDefault();
        
        
        //object["ID"] = localStorage.getItem('userLogged')
        // Creates Json
        var json = JSON.stringify(this.state)
        this.setState({xvalue: json});

        var url = urlBase + '/UpdateContact.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        alert(json)
        try
        {
            xhr.send(json);
            var jsonObject = JSON.parse( xhr.responseText );
        } catch (error) {}
       
        window.location.href = '/contacts'
    }
    

    render() {
        return (
            <div>
                <Container>
                    <ButtonToolbar>
                            <OverlayTrigger
                                ref={(ref) => this.overlay = ref}
                                trigger="click"
                                key={'auto'}
                                placement={'auto'}
                                overlay={
                                        <Form id="myForm" onSubmit={this.editData}>
                                            <Form.Row>
                                                <Form.Group controlId="firstName">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="First Name"
                                                        name="firstName"
                                                        value={this.state.firstName}
                                                        onChange={this.changeHandler}
                                                    />
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group controlId="lastName">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Last Name"
                                                        name="lastName"
                                                        value={this.state.lastName}
                                                        onChange={this.changeHandler}
                                                    />
                                                </Form.Group>
                                            </Form.Row> 

                                            <Form.Row>
                                                <Form.Group controlId="email">
                                                    <Form.Label>Username</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Email"
                                                            name="email"
                                                            value={this.state.email}
                                                            onChange={this.changeHandler}
                                                        />
                                                    </InputGroup>
                                                    </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group controlId="phoneNumber">
                                                    <Form.Label>Password</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                        <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            aria-describedby="inputGroupPrepend"
                                                            name="phoneNumber"
                                                            value={this.state.phoneNumber}
                                                            onChange={this.changeHandler}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>
                                            <Button className="mb-sm-3" type="submit">Update</Button>
                                        </Form>
                                }
                                >
                                <Button variant="secondary" className="m-sm-1"> <img src={Edit} width="20" height="20"/> </Button>
                            </OverlayTrigger>
                         </ButtonToolbar>
                </Container>
            </div>
        )
    }
}

export default EditContact
