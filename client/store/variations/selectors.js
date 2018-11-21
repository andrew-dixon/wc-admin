/** @format */

/**
 * External dependencies
 */
import { get } from 'lodash';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ERROR } from 'store/constants';
import { getJsonString } from 'store/utils';

/**
 * Returns products report details for a specific report query.
 *
 * @param  {Object} state  Current state
 * @param  {Object} query  Report query paremters
 * @return {Object}        Report details
 */
function getVariations( state, query = {} ) {
	return get( state, [ 'variations', getJsonString( query ) ], [] );
}

export default {
	getVariations,

	/**
	 * Returns true if a products request is pending.
	 *
	 * @param  {Object} state  Current state
	 * @return {Object}        True if the `getProducts` request is pending, false otherwise
	 */
	isGetVariationsRequesting( state, ...args ) {
		return select( 'core/data' ).isResolving( 'wc-admin', 'getVariations', args );
	},

	/**
	 * Returns true if a products request has returned an error.
	 *
	 * @param  {Object} state  Current state
	 * @param  {Object} query  Report query paremters
	 * @return {Object}        True if the `getProducts` request has failed, false otherwise
	 */
	isGetVariationsError( state, query ) {
		return ERROR === getVariations( state, query );
	},
};