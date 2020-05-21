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
		if (text.toLowerCase() != 'id') return <th key={index}>{text}</th>;
	});
}

const getRowsList = ({ headers, vehicles }) => {
	return vehicles.map((vehicle, index) => {
		const tdList = [];
		for (let i = 0; i < headers.length; i++) {
			const key = headers[i];
			// omit id field from table
			if (key.toLowerCase() != 'id')
				tdList.push(<td key={i}>{vehicle[key]}</td>);
		}

		return (
			<tr key={vehicle.vin}>
				{tdList}
			</tr>
		);
	});
}

export default Container;
