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
		const headersList = data.headers.map((text, index) => <th key={index}>{text}</th>);
		const rows = data.vehicles.map((vehicle, index) => {
			const tdList = [];
			for (let i = 0; i < data.headers.length; i++) {
				tdList.push(<td key={i}>{vehicle[data.headers[i]]}</td>);
			}

			return (
				<tr key={vehicle.vin}>
					{tdList}
				</tr>
			);
		});

		return (
			<div className="container-component">
				<table className="ui celled table">
						<thead>
							<tr>
								{headersList}
							</tr>
						</thead>
						<tbody>
							{rows}
						</tbody>
				</table>
			</div>
		);
	}
}

export default Container;
