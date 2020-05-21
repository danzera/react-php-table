import React from 'react';
// import '../../css/header.css'

class Header extends React.Component {
	render() {
		return (
			<div className="header-component">
				<h2 className="ui header">
					<i className="user icon"></i>
					<div className="content">
						Your Favorites
						<div className="sub header">
							{/* TODO: DYNAMICALLY SHOW FAVORITES COUNT HERE */}
							Favorite details here
						</div>
					</div>
				</h2>
			</div>
		);
	}
}

export default Header;
