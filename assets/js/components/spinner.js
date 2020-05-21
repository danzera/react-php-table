import React from 'react';

const Spinner = (props) => {
	// make spinner sizing and text customizable
	let loadingText = props.loadingText ? props.loadingText : 'Loading...';
	let size = props.size ? props.size : 'large';

	return (
		<div className="spinner-component">
			<div className={`ui active centered inline text ${size} loader`}>
				{loadingText}
			</div>
		</div>
	);
}

export default Spinner;
