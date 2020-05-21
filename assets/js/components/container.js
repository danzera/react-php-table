import React from 'react';
import Spinner from './spinner';

const Container = ({ data }) => {

	console.log(data);

	// show loading message if there is no data
	if (!data.vehicles.length) {
		return <Spinner />;
	}
	// show content
	else {
		const headersList = getHeadersList(data.headers);
		const rowsList = getRowsList(data);

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

const getHeadersList = (headers) => {
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

const getRowsList = ({ headers, vehicles }) => {
	return vehicles.map((vehicle, index) => {
		const tdList = [];

		// add icon according to favorites list
		tdList.push(getFavoritesIcon(vehicle.vin));

		for (let i = 0; i < headers.length; i++) {
			const key = headers[i];
			// omit id field from table
			if (key.toLowerCase() != 'id') {
				tdList.push(
					<td key={i}>
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

const getFavoritesIcon = (vin) => {
	// vehicle is a favorite
	if (0) {
		return (
			<td className="favorite-td center aligned" key={vin} data-label="Favorite">
				<i className="star icon"></i>
			</td>
		);
	}
	// vehicle is not a favorite
	else {
		return (
			<td className="favorite-td center aligned" key={vin} data-label="Favorite">
				<i className="star outline icon"></i>
			</td>
		);
	}
}

export default Container;
