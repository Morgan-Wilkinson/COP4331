import React, { Component } from 'react'

export class ADD_CONTACTS extends Component
{
	state =
	{
		first_name: ''
	}
	render()
	{
		// console helps me check that our object is being modified
		//console.log(this.state.first_name);
		//
		//
		return (
			<form onSubmit={this.on_submit} style={{ display: 'flex'}}>
			<input
				type="text"
				name="first_name"
				style={{ flex: '10', padding: '10px'}}
				placeholder="add contactss ..."
				value={this.state.first_name}
				onChange={this.changing}
			/>
			<input
				type="submit"
				value="submit"
				className="btn"
				style={{flex: '1'}}
			/>
			</form>

		)
	}
	on_submit = (e) =>
	{
		e.preventDefault();
		this.props.adding_contacts(this.state.first_name);
		// set the value back to empty after submitting
		this.setState({ first_name: ''});
	}

	// helps take input
	changing = (e) => this.setState(
	{
		// it can take is multiple values if necessary
		[e.target.name]:  e.target.value});
}

export default ADD_CONTACTS
