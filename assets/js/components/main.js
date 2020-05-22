import React from 'react';
import axios from 'axios';

import Header from './header';
import Container from './container';
import Footer from './footer';

class Main extends React.Component {
	constructor(props) {
		super(props);

		// initialize state
		const favorites = window.localStorage.favorites ? JSON.parse(window.localStorage.favorites) : [];
		this.state = {
			favorites,
			data: {
				num_pages: 1,
				current_page: 1,
				headers: [],
				vehicles: []
			}
		}

		this.favoriteClicked = this.favoriteClicked.bind(this);
		this.pageNumberClicked = this.pageNumberClicked.bind(this);
	}

	componentDidMount() {
		// call API to retrieve vehicle data
		this.fetchData();
	}

	fetchData(page_requested = 1, num_results = 25) {
		// call API to retrieve vehicle data
		axios.get('api/data', {
			params: { page_requested, num_results }
		}).then(res => {
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
				window.localStorage.favorites = JSON.stringify(this.state.favorites);
		});
	}

	pageNumberClicked(pageNumber) {
		this.fetchData(pageNumber);
	}

	render() {
		return (
			<div className="main-component">
				<Header favorites={this.state.favorites} />
				<Container data={this.state.data}
									 favorites={this.state.favorites}
									 favoriteClicked={this.favoriteClicked}
									 pageNumberClicked={this.pageNumberClicked}
				/>
				<Footer />
			</div>
		);
	}
}

export default Main;
