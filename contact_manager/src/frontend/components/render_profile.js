import React, { Component } from 'react'
import PropTypes from 'prop-types';

// get pixel length and width of browser
var wide = window.innerWidth; var hight = window.innerHeight;

export class RENDER_PROFILE extends Component
{

	render()
	{
		const {id, first_name, last_name, phone_num, email_num, completed} = this.props.manager;
		if (this.props.manager.completed == true)
		{
			//helps show only one info at a time
			// FONT DOESNT WORK FIND OUT DURING LECTURE
			this.props.manager.completed = false;
			return (
				<div className = "flex" style={get_style}>
					<div>
					<h1 className = "font_size_name">{first_name + " " + last_name}</h1>
					<h3 className = "font_size_other">{phone_num}</h3>
					<h3 className = "font_size_other">{email_num}</h3>
					<div >
						<button style={btn_styleA}> Edit </button>
						<button onClick={this.props.delete_check.bind(this, id)}
							style={btn_styleB}> Delete </button>
					</div>
					</div>
				</div>
			)
		}
		else {
			return(null)
		}
	}

}
const btn_styleA =
{
  background: 'gray',
  color: 'white',
  border: 'none',
  padding: '20px 50px', //button size
  borderRadius: '50%',
  cursor: 'pointer', //shows the hand sign when selecting button
  float: 'right' //positioning
}

const btn_styleB =
{
  background: 'gray',
  color: 'white',
  border: 'none',
  padding: '20px 50px', //button size
  borderRadius: '50%',
  cursor: 'pointer', //shows the hand sign when selecting button
  float: 'left' //positioning
}

const get_style =
{

		//ternary operator
		// extra styling similar to CSS
		borderBottom: '4px #ccc dotted',
		background: 'lightgrey',
		padding: '10px',
		height: '100vh'
		//display: 'flex',
		//align_items: 'center'
		//textAlign: 'center'
}

RENDER_PROFILE.propTypes =
{
	manager: PropTypes.object.isRequired
}

export default RENDER_PROFILE
