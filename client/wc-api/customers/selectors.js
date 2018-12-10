/** @format */

/**
 * External dependencies
 */
import { isNil } from 'lodash';

/**
 * Internal dependencies
 */
import { getResourceName } from '../utils';
import { DEFAULT_REQUIREMENT } from '../constants';

const getCustomer = ( getResource, requireResource ) => (
	query = {},
	requirement = DEFAULT_REQUIREMENT
) => {
	const resourceName = getResourceName( 'customer-query', query );
	const ids = requireResource( requirement, resourceName ).data || [];
	const customers = ids.map( id => getResource( getResourceName( 'customer', id ) ).data || {} );
	return customers;
};

const isGetCustomerRequesting = getResource => ( query = {} ) => {
	const resourceName = getResourceName( 'customer-query', query );
	const { lastRequested, lastReceived } = getResource( resourceName );

	if ( isNil( lastRequested ) ) {
		return false;
	}

	if ( isNil( lastReceived ) ) {
		return true;
	}

	return lastRequested > lastReceived;
};

const isGetCustomerError = getResource => ( query = {} ) => {
	const resourceName = getResourceName( 'customer-query', query );
	return getResource( resourceName ).error;
};

export default {
	getCustomer,
	isGetCustomerRequesting,
	isGetCustomerError,
};
