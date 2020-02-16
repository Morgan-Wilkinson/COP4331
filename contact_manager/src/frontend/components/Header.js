import React, { Component, Fragment } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            signIn: ""
        };
    }

    signInOut(){
        if (localStorage.userLogged){
            return <Button href="/" variant="outline-info">Sign Out</Button>
        }
        else{
            return(
                <Fragment>
                    <Button href="/signin" variant="outline-info" className="mr-sm-2">Sign In</Button>
                    <Button href="/signup" variant="outline-info" className="mr-sm-2">Sign Up</Button>
                </Fragment>
            );
        }
    }

    contactsPageOrHome(){
        if (localStorage.userLogged){
            return <Nav.Link href="/contacts">Contacts</Nav.Link>
        }
        else{
            return <Nav.Link href="/">Home</Nav.Link>
        }
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Hive Mind</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {this.contactsPageOrHome()}
                            <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {this.signInOut()}
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header
