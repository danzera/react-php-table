import React from 'react';
import axios from 'axios';

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
			data: {
				headers: [],
				vehicles: []
			}
		}
	}

	componentDidMount() {
		// call API to retrieve vehicle data
		axios.get('api/data').then(res => {
			console.log('api/data response received', res);
			this.setState({ data: res.data });
		}, err => {
			// TODO: handle error with data fetch
		});
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
