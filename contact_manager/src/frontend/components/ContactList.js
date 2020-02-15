import React, { Component } from 'react'
import { Table, Container } from 'react-bootstrap'

export class ContactList extends Component {
    constructor(props) { 
        super(props);

        this.jsonObject = []
    }
    // pass in props from SignIn.js like <ContactList username={jsonObject.ID} /> // ID may change in future
    getContacts() {
        // var username = this.props.username
        var object = {userID: this.props.username};
        var json = JSON.stringify(object); 
        // Send post request to get contacts
        var urlBase = 'http://cop4331-project.com/API';
        var url = urlBase + '/SearchAll.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(json);
            this.jsonObject = JSON.parse( xhr.responseText );
            console.log(this.jsonObject)
        } catch (error) {}
    }

    renderContact(person, index){
        return (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.phoneNumber}</td>
            </tr>
          )
    }

    render() {
        return (
                <div>
                    <Container fluid>
                        <Table responsive hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.jsonObject.map(this.renderContact)}
                            </tbody>
                        </Table>
                    </Container>
            </div>
        )
    }
}

export default ContactList
