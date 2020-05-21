import React from 'react';
import Spinner from './spinner';

class Container extends React.Component {

	render() {
		// show loading message if there is no data
		if (!this.props.data.length) {
			return <Spinner />;
		}
		// show content
		else {
			return (
				<div className="container-component">
					Container Content
				</div>
			);
		}
	}
}

export default Container;
