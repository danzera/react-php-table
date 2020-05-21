import React from 'react';
import Header from './header';
import Container from './container';
import Footer from './footer';

class Main extends React.Component {
	constructor(props) {
		super(props);

		// TODO: CHECK LOCAL STORAGE FOR FAVORITES LIST
		// window.localStorage.favorites

		// initialize state
		this.state = {
			favorites: [], // will need to utilize local storage for state initialization
			data: [] // will need to be populated via API call
		}
	}

	componentDidMount() {
		// TODO: MAKE API CALL AND 
	}

	render() {
		return (
			<div className="main-component ui container">
				<Header />
				<Container data={ this.state.data } />
				<Footer />
			</div>
		);
	}
}

export default Main;
