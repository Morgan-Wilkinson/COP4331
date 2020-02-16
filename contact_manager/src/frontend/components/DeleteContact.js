import React, { Component } from 'react'
import Trash from "./trash.png";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';

export class DeleteContact extends Component {
    constructor(props) { 
        super(props);
    };

    deleteContact = (event) => {
            // var username = this.props.username
            var object = {input: this.props.ID};
            
            var json = JSON.stringify(object); 
            // Send post request to get contacts
            var urlBase = 'http://cop4331-project.com/API';
            var url = urlBase + '/DeleteContact.php';
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

            try
            {
                xhr.send(json);
                this.jsonObject = JSON.parse( xhr.responseText );
            } catch (error) {}
    }

    render() {
        return (
            <div>
                <ButtonToolbar>
                    {['top'].map(placement => (
                        <OverlayTrigger
                        ref={(ref) => this.overlay = ref}
                        trigger="click"
                        key={placement}
                        placement={'auto'}
                        overlay={
                            <Popover id={'deleteButton'}>
                            <Popover.Title as="h3">Delete Confirmation</Popover.Title>
                            <Popover.Content>
                                Are you sure you wish to delete this contact?
                                <Button variant="secondary" size="sm" type='button' onClick={this.deleteContact}>Yes</Button>
                                <Button variant="secondary" size="sm" type='button' >No</Button>
                            </Popover.Content>
                            </Popover>
                        }
                        >
                        <Button variant="secondary"><img src={Trash} width="20" height="20"/></Button>
                        </OverlayTrigger>
                    ))}
                </ButtonToolbar>
            </div>
        )
    }
}

export default DeleteContact
