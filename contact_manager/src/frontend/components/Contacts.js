import React, { Component } from 'react'
import PropTypes from 'prop-types';

// This class is mainly for rendering text and styling certain components
export class Contacts extends Component
{
    render()
		{
      const {id, first_name, last_name, completed } = this.props.manager;
      return (
        <div style={this.get_style()}>
  				<p>
            <button onClick={this.props.mark_check.bind(this, id)}
            style={info_btn_style}> info </button>
            {first_name + " " + last_name + " " + completed}
          </p>
        </div>
      )
    }
    get_style = () =>
    {
      return {


        //ternary operator
        /*
        textDecoration: this.props.manager.completed ?
        'line-through': 'none',
        */
        // extra styling similar to CSS
        borderBottom: '4px #ccc dotted',
        background: 'lightgrey',
        padding: '10px',
        //textAlign: 'center
      }
    }
}
const info_btn_style =
{
  background: 'gray',
  color: 'white',
  border: 'none',
  padding: '5px 10px', //button size
  borderRadius: '50%',
  cursor: 'pointer', //shows the hand sign when selecting button
  float: 'right' //positioning
}
const btn_style =
{
  background: 'gray',
  color: 'white',
  border: 'none',
  padding: '5px 10px', //button size
  borderRadius: '50%',
  cursor: 'pointer', //shows the hand sign when selecting button
  float: 'right' //positioning
}
//proptypes
Contacts.propTypes =
{
	manager: PropTypes.object.isRequired
}

export default Contacts
