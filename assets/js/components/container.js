import React from 'react';
import Spinner from './spinner';

class Container extends React.Component {

	// ----- EVENT HANDLERS -----
	onFavoriteClick(e) {
		const vin = e.target.closest('td').getAttribute('data-vin');
		// pass vin up to parent function
		this.props.favoriteClicked(vin);
	}

	onPageNumberClick(e) {
		const page = e.target.getAttribute('data-page');
		// pass page number up to parent to make new request
		this.props.pageNumberClicked(page);
	}

	onArrowClick(e) {
		const page = Number(e.target.closest('a').getAttribute('data-page')) + this.props.data.current_page;
		// change page if in range
		if (page > 0 && page <= this.props.data.num_pages) this.props.pageNumberClicked(page);
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
			const pageNumbers = this.getPageNumbers(this.props.data.num_pages, this.props.data.current_page);

			return (
				<div className="container-component">
					<table className="ui celled unstackable table">
							<thead>
								<tr>
									<th>FAVORITE</th>
									{headersList}
								</tr>
							</thead>
							<tbody>
								{rowsList}
							</tbody>
							<tfoot>
								<tr>
									<th colSpan={this.props.data.num_pages}>
										<div className="ui pagination menu">
											<a className="icon item" data-page={-1} onClick={e => this.onArrowClick(e)}>
												<i className="left chevron icon"></i>
											</a>
											{pageNumbers}
											<a className="icon item" data-page={1} onClick={e => this.onArrowClick(e)}>
												<i className="right chevron icon"></i>
											</a>
										</div>
									</th>
								</tr>
							</tfoot>
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

	getPageNumbers(num_pages, current_page) {
		let pageNumbersList = [];
		for (let i = 1; i <= num_pages; i++) {
			const classStr = (i == current_page) ? "item current-page" : "item";
			pageNumbersList.push(
				<a className={classStr} key={i} data-page={i} onClick={e => this.onPageNumberClick(e)}>
					{i}
				</a>
			);
		}
		return pageNumbersList;
	}
}

export default Container;
