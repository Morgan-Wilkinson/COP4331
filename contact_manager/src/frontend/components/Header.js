import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

export class Header extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Contact Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/newcontact">Add New Contact</NavDropdown.Item>
                                <NavDropdown.Item href="/search">Search Contacts</NavDropdown.Item>
                                
                                <NavDropdown.Divider />
                                {/* Maybe make a edit button in the contact page?*/}
                                <NavDropdown.Item href="#delete">Delete Contacts? This is a placeholder</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/signin">Sign In</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header
