import React from 'react';
import Spinner from './spinner';

class Container extends React.Component {

	// ----- EVENT HANDLERS -----
	onFavoriteClick(e) {
		const vin = e.target.closest('td').getAttribute('data-vin');
		// pass vin up to parent function
		this.props.favoriteClicked(vin);
	}

	// ----- RENDER -----
	render() {
	// show loading message if there is no data
		if (!this.props.data.vehicles.length) {
			return <Spinner />;
		}
		// show content
		else {
			const headersList = this.getHeadersList(this.props.data.headers);
			const rowsList = this.getRowsList(this.props.data);

			return (
				<div className="container-component">
					<table className="ui celled table">
							<thead>
								<tr>
									<th>FAVORITE</th>
									{headersList}
								</tr>
							</thead>
							<tbody>
								{rowsList}
							</tbody>
					</table>
				</div>
			);
		}
	}

	// ----- CONTENT GENERATION
	// generate table headers
	getHeadersList(headers) {
		return headers.map((text, index) => {
			// omit id field from table
			if (text.toLowerCase() != 'id') {
				// TODO: make a more elegant solution to determining table display names
				const textArr = text.toUpperCase().split('_');
				const displayName = textArr.join(' ');
				
				return (
					<th className="single line" key={index}>
						{displayName}
					</th>
				);
			}
		});
	}

	// generate table rows
	getRowsList({ headers, vehicles }) {
		return vehicles.map((vehicle, index) => {
			const tdList = [];

			// add icon according to favorites list
			tdList.push(this.getFavoritesIcon(vehicle.vin));

			for (let i = 0; i < headers.length; i++) {
				const key = headers[i];
				// omit id field from table
				if (key.toLowerCase() != 'id') {
					tdList.push(
						<td className="single line" key={i}>
							{vehicle[key]}
						</td>
					);
				}
			}

			return (
				<tr key={vehicle.vin}>
					{tdList}
				</tr>
			);
		});
	}

	// generate favorite icons according to favorites list
	getFavoritesIcon(vin) {
		// vehicle is a favorite
		if (this.props.favorites.includes(vin)) {
			return (
				<td className="favorite-td center aligned" key={vin} data-vin={vin} data-label="Favorite" onClick={e => this.onFavoriteClick(e)}>
					<i className="star icon"></i>
				</td>
			);
		}
		// vehicle is not a favorite
		else {
			return (
				<td className="favorite-td center aligned" key={vin} data-vin={vin} data-label="Favorite" onClick={e => this.onFavoriteClick(e)}>
					<i className="star outline icon"></i>
				</td>
			);
		}
	}
}

export default Container;
