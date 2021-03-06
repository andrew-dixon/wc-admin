/** @format */

/**
 * External dependencies
 */
import { isNil } from 'lodash';

/**
 * Internal dependencies
 */
import { getResourceName } from '../../utils';
import { DEFAULT_REQUIREMENT } from '../../constants';

const getReportStats = ( getResource, requireResource ) => (
	type,
	query = {},
	requirement = DEFAULT_REQUIREMENT
) => {
	const resourceName = getResourceName( `report-stats-query-${ type }`, query );
	const data = requireResource( requirement, resourceName ) || {};

	return data;
};

const isReportStatsRequesting = getResource => ( type, query = {} ) => {
	const resourceName = getResourceName( `report-stats-query-${ type }`, query );
	const { lastRequested, lastReceived } = getResource( resourceName );

	if ( isNil( lastRequested ) || isNil( lastReceived ) ) {
		return true;
	}

	return lastRequested > lastReceived;
};

const isReportStatsError = getResource => ( type, query = {} ) => {
	const resourceName = getResourceName( `report-stats-query-${ type }`, query );
	return getResource( resourceName ).error;
};

export default {
	getReportStats,
	isReportStatsRequesting,
	isReportStatsError,
};
