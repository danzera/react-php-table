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
			favorites: [] // will need to utilize local storage for state initialization
		}
	}

	render() {
		return (
			<div className="main-component ui container">
				<Header />
				<Container />
				<Footer />
			</div>
		);
	}
}

export default Main;
