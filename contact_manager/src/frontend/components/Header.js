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

    clearCookies = (event) =>{
        var cookies = document.cookie.split("; ");
        for (var c = 0; c < cookies.length; c++) {
            var d = window.location.hostname.split(".");
            while (d.length > 0) {
                var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
                var p = window.location.pathname.split('/');
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                };
                d.shift();
            }
        }
    }

    signInOut(){
        if (localStorage.userLogged){
            return (
                <Fragment>
                    <Button type='button' variant="outline-info" onClick={this.clearCookies} href="/">Sign Out</Button>
                </Fragment>
            );
            
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
