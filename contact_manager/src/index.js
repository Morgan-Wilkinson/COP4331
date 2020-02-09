import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './frontend/components/Header.js';
import About from './frontend/components/About.js';
import SignIn from './frontend/components/SignIn.js';
import SignUp from './frontend/components/SignUp.js';
import ContactList from './frontend/components/ContactList.js';
import NotFound from './frontend/components/NotFound.js';
import MasterPage from './frontend/components/MasterPage.js';

const routing = (
    <Router>
        <div>
            <Header></Header>
            <Switch>
            <Route exact path="/" component={MasterPage} />
            <Route path="/about" component={About} /> 
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/contacts" component={ContactList} />
            <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'));