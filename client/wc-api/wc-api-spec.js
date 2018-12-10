/** @format */

/**
 * Internal dependencies
 */
import customers from './customers';
import notes from './notes';
import orders from './orders';

function createWcApiSpec() {
	return {
		selectors: {
			...customers.selectors,
			...notes.selectors,
			...orders.selectors,
		},
		operations: {
			read( resourceNames ) {
				return [
					...customers.operations.read( resourceNames ),
					...notes.operations.read( resourceNames ),
					...orders.operations.read( resourceNames ),
				];
			},
		},
	};
}

export default createWcApiSpec();
