import React from 'react';

const Header = ({ favorites }) => {
	return (
		<div className="header-component">
			<h2 className="ui header">
				<i className="user icon"></i>
				<div className="content">
					Your Favorites
					<div className="sub header">
						You have {favorites.length} favorites.
					</div>
				</div>
			</h2>
		</div>
	);
}

export default Header;
