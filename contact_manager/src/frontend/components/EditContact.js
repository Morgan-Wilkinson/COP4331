import React, { Component } from 'react'
import Edit from "./edit.jpg";
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { Button, Popover, OverlayTrigger, Container, ButtonToolbar, Col } from 'react-bootstrap';

export class EditContact extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
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

        // Retrieves the form this is below in the render.
        let myForm = document.getElementById('myForm');
        let formData = new FormData(myForm);
        var object = {};
        // Assigns the appropriate value and key for each item in the form.
        formData.forEach((value, key) => {object[key] = value});
        // Creates Json
        var json = JSON.stringify(object); 
        this.setState({xvalue: json});

        var url = urlBase + '/SignIN.php';
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
        return (
            <div>
                <Container>
                    <ButtonToolbar>
                        {['top'].map(placement => (
                            <OverlayTrigger
                            ref={(ref) => this.overlay = ref}
                            trigger="click"
                            key={placement}
                            placement={'auto'}
                            overlay={
                                <Popover id={'edit'}>
                                <Popover.Title as="h3">Delete Confirmation</Popover.Title>
                                <Popover.Content>
                                    /*First Name form data*/
                                    <Form id="myForm" onSubmit={this.editData}>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={this.props.person[0]}
                                    onChange={this.changeHandler}
                                />
                                </Form.Group>
                            
                            {/*Last Name form data*/}
                                <Form.Group as={Col} md="4" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={this.props.person[1]}
                                    onChange={this.changeHandler}
                                />
                                </Form.Group>
                                </Form.Row> {/*End of Row*/}

                                <Form.Row>
                                {/*User Name form data*/}
                                <Form.Group as={Col} md="4" controlId="email">
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={this.props.person[2]}
                                        onChange={this.changeHandler}
                                    />
                                </InputGroup>
                                </Form.Group>

                                {/*Password form data*/}
                                <Form.Group as={Col} md="4" controlId="phoneNumber">
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
                                        value={this.props.person[3]}
                                        onChange={this.changeHandler}
                                    />
                                </InputGroup>
                                </Form.Group>

                                </Form.Row>  {/*End of Row*/}
                            
                            <Button type="submit">Update</Button>
                            </Form>
                                </Popover.Content>
                                </Popover>
                            }
                            >
                            <Button variant="secondary"><img src={Edit} width="20" height="20"/></Button>
                            </OverlayTrigger>
                        ))}
                         </ButtonToolbar>
                </Container>
            </div>
        )
    }
}

export default EditContact
