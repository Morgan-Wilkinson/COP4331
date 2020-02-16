import React, { Component } from 'react'
import { Card, Form, Popover, Button, ButtonToolbar, FormGroup, InputGroup, Col } from 'react-bootstrap'; 

export class AddContact extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            userID: ""
        };
    }
    
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    addContact = (event) => {
        var urlBase = 'http://cop4331-project.com/API';
        // Stops form submission if the form is empty or in default state.
        event.preventDefault();

        // Retrieves the form this is below in the render.
        let myForm = document.getElementById('myForm');
        let formData = new FormData(myForm);
        var object = {};
        // Assigns the appropriate value and key for each item in the form.
        formData.forEach((value, key) => {object[key] = value});
        object["userID"] = localStorage.getItem('userLogged');
        // Creates Json
        var json = JSON.stringify(object); 
        this.setState({xvalue: json});
        alert(json);

        var url = urlBase + '/AddContact.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(json);
            var jsonObject = JSON.parse( xhr.responseText );
            alert(jsonObject.success);
        } catch (error) {}
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Add Contact</Card.Title>
                        <Card.Text>

                            <Form id="myForm" noValidate onSubmit={this.addContact}>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="firstName">
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
                                {/*Last Name form data*/}
                                <Form.Group as={Col} md="4" controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Group>
                            </Form.Row> {/*End of Row*/}

                            <Form.Row>
                                {/*User Name form data*/}
                                <Form.Group as={Col} md="4" controlId="email">
                                <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Group>
                            </Form.Row>  {/*End of Row*/}

                            <Form.Row>
                                {/*User Name form data*/}
                                <Form.Group as={Col} md="4" controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                        type="text"
                                        placeholder="Phone Number"
                                        aria-describedby="inputGroupPrepend"
                                        name="phoneNumber"
                                        value={this.state.username}
                                        onChange={this.changeHandler}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>  {/*End of Row*/}
                            <Button type="submit">Submit</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default AddContact
