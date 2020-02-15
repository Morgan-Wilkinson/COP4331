
import React, { Component } from 'react';
import RENDER_PROFILE from './render_profile';
import PropTypes from 'prop-types';

class PROFILE extends Component
{


	render()
	{
		/* manager is something I created to pass unto now */
		return this.props.cur_contacts.map((manager)=>(
			<RENDER_PROFILE key={manager.id} manager={manager}
			delete_check={this.props.delete_check}/>
		));
	}

}

//proptypes
PROFILE.propTypes =
{
	cur_contacts: PropTypes.array.isRequired
}

export default PROFILE;
