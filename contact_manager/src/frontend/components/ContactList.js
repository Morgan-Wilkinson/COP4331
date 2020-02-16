import React, { Component } from 'react'
import { Table, Container, ButtonToolbar, Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { Form, FormControl, InputGroup } from 'react-bootstrap'; 
import AddContact from './AddContact.js'; 

export class ContactList extends Component {
    constructor(props) { 
        super(props);

        this.jsonObject = []

        this.state = {
            searchBar: "",
        };
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    updateSearch(event){
        this.setState({searchBar: event.target.value.substr(0, 20)});
    }

    // pass in props from SignIn.js like <ContactList username={jsonObject.ID} /> // ID may change in future
    getContacts() {
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

    searchContact(){

    }

    renderTableData() {
        let filteredContacts = this.jsonObject.results.filter(
            (contact) => {
                return (
                    contact[0].toLowerCase().indexOf(this.state.searchBar.toLowerCase()) !== -1 || // First Name
                    contact[1].toLowerCase().indexOf(this.state.searchBar.toLowerCase()) !== -1 || // Last Name
                    contact[3].toLowerCase().indexOf(this.state.searchBar.toLowerCase()) !== -1); // Phone
            }
        )
        return filteredContacts.map((person, index) => {
           return (
              <tr key={person[4]}>
                 <td>{person[0]}</td> {/*First Name*/}
                 <td>{person[1]}</td> {/*Last Name*/}
                 <td>{person[2]}</td> {/*Email*/}
                 <td>{person[3]}</td> {/*Phone*/}
                 <td>{person[4]}</td> {/*UserID/ Delete Button*/}
              </tr>
           )
        })
     }
   

    render() {
        return (
                <div className="w3-container">
                    {this.getContacts()}
                    <Container fluid='true'>
                    <InputGroup className="mb-3">
                            <FormControl
                                id="searchBar"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={this.state.searchBar}
                                onChange={this.updateSearch.bind(this)}
                            />
                        </InputGroup>
                        <Table responsive hover variant="dark">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </Table>
                        <div classNamec="w3-display-middle">
                        <ButtonToolbar>
                        {['left'].map(placement => (
                            <OverlayTrigger
                                trigger="click"
                                key={placement}
                                placement={'auto'}
                                overlay={
                                    <Popover id='addContact'>
                                        <AddContact/>
                                    </Popover>
                                }>
                                <Button variant="primary">Add Contact</Button>
                            </OverlayTrigger>
                        ))}
                    </ButtonToolbar>
                    </div>
                    </Container>
            </div>
        )
    }
}

export default ContactList
