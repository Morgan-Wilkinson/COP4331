import React, { Component } from 'react'
import { Table, Container, ButtonToolbar, Button, OverlayTrigger, Popover } from 'react-bootstrap'
import AddContact from './AddContact.js'; 

export class ContactList extends Component {
    constructor(props) { 
        super(props);

        this.jsonObject = []
    }
    // pass in props from SignIn.js like <ContactList username={jsonObject.ID} /> // ID may change in future
    getContacts() {
        // var username = this.props.username
        if (localStorage.userLogged){
            var object = {userID: localStorage.getItem('userLogged')};
        }
        
        var json = JSON.stringify(object); 
        // Send post request to get contacts
        var urlBase = 'http://cop4331-project.com/API';
        var url = urlBase + '/SearchAll.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(json);
            this.jsonObject = JSON.parse( xhr.responseText );
        } catch (error) {}
    }

    deleteContact() {
        // var username = this.props.username
        if (localStorage.userLogged){
            var object = {userID: localStorage.getItem('userLogged')};
        }
        
        var json = JSON.stringify(object); 
        // Send post request to get contacts
        var urlBase = 'http://cop4331-project.com/API';
        var url = urlBase + '/SearchAll.php';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(json);
            this.jsonObject = JSON.parse( xhr.responseText );
        } catch (error) {}
    }

    renderTableData() {
        return this.jsonObject.results.map((person, index) => {
           return (
              <tr key={person[4]}>
                 <td>{person[0]}</td>
                 <td>{person[1]}</td>
                 <td>{person[2]}</td>
                 <td>{person[3]}</td>
                 <td>{person[4]}</td>
              </tr>
           )
        })
     }
   

    render() {
        return (
                <div>
                    <Container fluid>
                        {this.getContacts()}
                        <Table responsive hover variant="dark">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </Table>
                    </Container>

                    <ButtonToolbar>
                        {['left'].map(placement => (
                            <OverlayTrigger
                                trigger="click"
                                key={placement}
                                placement={'bottom-end'}
                                overlay={
                                    <Popover id={`addContact`}>
                                        <AddContact></AddContact>
                                    </Popover>
                                }
                                >
                                <Button variant="primary">Add Contact</Button>
                            </OverlayTrigger>
                        ))}
                    </ButtonToolbar>
            </div>
        )
    }
}

export default ContactList
