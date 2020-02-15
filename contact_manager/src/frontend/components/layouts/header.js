import React from 'react';

function Header()
{
	return (
		<header style={header_style}>
			<h1> Contact Manager </h1>
		</header>
	)
}

const header_style =
{
	background: 'LightSlateGray',
	color: 'AliceBlue',
	textAlign: 'center',
	padding: '10px'
}

export default Header;
