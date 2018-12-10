/** @format */
/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { isResourcePrefix, getResourceIdentifier } from '../utils';
import { NAMESPACE } from '../constants';

function read( resourceNames, fetch = apiFetch ) {
	return [
		...readCustomers( resourceNames, fetch ),
		...readCustomerQueries( resourceNames, fetch ),
	];
}

function readCustomerQueries( resourceNames, fetch ) {
	const filteredNames = resourceNames.filter( name => isResourcePrefix( name, 'customer-query' ) );

	return filteredNames.map( async resourceName => {
		const id = getResourceIdentifier( resourceName );
		const url = `${ NAMESPACE }/customers/${ id }`;

		try {
			const response = await fetch( {
				parse: false,
				path: url,
			} );

			const customer = await response.json();
			return customer;
		} catch ( error ) {
			return { [ resourceName ]: { error } };
		}
	} );
}

function readCustomers( resourceNames, fetch ) {
	const filteredNames = resourceNames.filter( name => isResourcePrefix( name, 'customer' ) );
	return filteredNames.map( resourceName => readCustomer( resourceName, fetch ) );
}

function readCustomer( resourceName, fetch ) {
	const id = getResourceIdentifier( resourceName );
	const url = `${ NAMESPACE }/customers/${ id }`;

	return fetch( { path: url } )
		.then( customer => {
			return { [ resourceName ]: { data: customer } };
		} )
		.catch( error => {
			return { [ resourceName ]: { error } };
		} );
}

export default {
	read,
};
