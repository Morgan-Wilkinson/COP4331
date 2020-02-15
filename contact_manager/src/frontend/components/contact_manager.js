import React, { Component } from 'react';
import CONTACTS from './Contacts';
import PropTypes from 'prop-types';
//todo = manager
//todos = stuff_todo

class CONTACT_MANAGER extends Component
{

	render()
	{
		/* manager is something I created to pass unto now */
	  return this.props.cur_contacts.map((manager)=>(
			<CONTACTS key={manager.id} manager={manager}
			mark_check={this.props.mark_check}/>

		));
	}
}

//proptypes
CONTACT_MANAGER.propTypes =
{
	cur_contacts: PropTypes.array.isRequired
}

export default CONTACT_MANAGER;
