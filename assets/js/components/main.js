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
		// window.localStorage.favorites = window.localStorage.favorites ? window.localStorage.favorites : [];
		// if (window.localStorage.favorites.length) {
		//
		// }

		// initialize state
		this.state = {
			favorites: [], // will need to utilize local storage for state initialization
			data: {
				headers: [],
				vehicles: []
			}
		}

		this.favoriteClicked = this.favoriteClicked.bind(this);
	}

	componentDidMount() {
		// call API to retrieve vehicle data
		axios.get('api/data').then(res => {
			this.setState({ data: res.data });
		}, err => {
			// TODO: handle error with data fetch
		});
	}

	favoriteClicked(clickedVin) {
		let newFavorites = [];
		let newFavorite = 1;
		this.state.favorites.forEach(curVin => {
			// remove vin from new favorites list if it was already a favorite
			if (curVin == clickedVin) newFavorite = 0;
			else newFavorites.push(curVin);
		});
		// clickedVin was not already present in list of favorites
		if (newFavorite) newFavorites.push(clickedVin);
		// update state
		this.setState({ favorites: newFavorites }, () => {
			// update localStorage
			// 	window.localStorage.favorites = JSON.stringify(this.state.favorites);
			// 	console.log(JSON.parse(window.localStorage.favorites))
		});
	}

	render() {
		return (
			<div className="main-component ui container">
				<Header />
				<Container data={this.state.data} favoriteClicked={this.favoriteClicked} />
				<Footer />
			</div>
		);
	}
}

export default Main;
