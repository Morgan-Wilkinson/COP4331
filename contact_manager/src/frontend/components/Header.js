import React, { Component, Fragment } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

export class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            signIn: ""
        };
    }

    isSignedIn(){
        if (localStorage.userLogged){
            return <Nav.Link href="/">Sign Out</Nav.Link>
        }
        else{
            return(
                <Fragment>
                    <Nav.Link href="/signin">Sign In</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>)
                </Fragment>
            );
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
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {this.isSignedIn()}
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header
