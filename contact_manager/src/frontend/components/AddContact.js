import React, { Component } from 'react'
import { Table, Form, Popover, Button, ButtonToolbar, FormGroup, InputGroup, Col } from 'react-bootstrap'; 

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

        var url = urlBase + '/AddContact.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(json);
            var jsonObject = JSON.parse( xhr.responseText );
        } catch (error) {}

        this.setState({ state: this.state });
    }

    render() {
        return (
            <div>
                <Table responsive variant="dark">
                    <tbody>
                        <Form id="myForm" noValidate onSubmit={this.addContact}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                        {/*Last Name form data*/}
                            <Form.Group as={Col} controlId="lastName">
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                        {/*User Name form data*/}

                            <Form.Group as={Col} controlId="email">
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>

                        {/*User Name form data*/}
                            <Form.Group as={Col} controlId="phoneNumber">
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
                                </InputGroup>
                            </Form.Group>
                        <Button as={Col} type="submit">Submit</Button>
                        </Form.Row>
                        </Form>
                    </tbody>
                </Table>
            </div>
)
    }
}

export default AddContact
