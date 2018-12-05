/** @format */
/**
 * External dependencies
 */
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Card } from '@woocommerce/components';
import ReportChart from 'analytics/components/report-chart';

class ChartBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = {};
		// this.toggle = this.toggle.bind( this );
	}

	render() {
		const charts = [
			{
				key: 'orders_count',
				label: 'Orders Count',
				type: 'number',
			},
		];
		const path = '/analytics/orders';
		const query = {
			period: 'quarter',
			compare: 'previous_period',
			type: 'line',
		};
		const selectedChart = charts[ 0 ];
		return (
			<Fragment>
				<Card className="woocommerce-dashboard__chart-block">
					<ReportChart
						charts={ charts }
						endpoint="orders"
						path={ path }
						query={ query }
						selectedChart={ selectedChart }
					/>
				</Card>
			</Fragment>
		);
	}
}

export default ChartBlock;
