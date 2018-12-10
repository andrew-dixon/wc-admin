/** @format */

/**
 * Internal dependencies
 */
import notes from './notes';
import orders from './orders';
import reportItems from './reports/items';
import reportStats from './reports/stats';
import user from './user';

function createWcApiSpec() {
	return {
		mutations: {
			...user.mutations,
		},
		selectors: {
			...notes.selectors,
			...orders.selectors,
			...reportItems.selectors,
			...reportStats.selectors,
			...user.selectors,
		},
		operations: {
			read( resourceNames ) {
				return [
					...notes.operations.read( resourceNames ),
					...orders.operations.read( resourceNames ),
					...reportItems.operations.read( resourceNames ),
					...reportStats.operations.read( resourceNames ),
					...user.operations.read( resourceNames ),
				];
			},
			update( resourceNames, data ) {
				return [ ...user.operations.update( resourceNames, data ) ];
			},
		},
	};
}

export default createWcApiSpec();
