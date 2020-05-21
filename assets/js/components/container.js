import React from 'react';
import Spinner from './spinner';

class Container extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data
		}
	}

	render() {
		// show loading message if there is no data
		if (!this.state.data.length) {
			return <Spinner />;
		} else { // show content
			return (
				<div className="container-component">
					Container Content
				</div>
			);
		}
	}
}

export default Container;
