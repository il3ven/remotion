import type {AwsRegion} from '../client';
import {AWS_REGIONS} from '../regions';
import {REMOTION_BUCKET_PREFIX} from './constants';
import {randomHash} from './random-hash';

export const validateBucketName = (
	bucketName: unknown,
	options: {
		mustStartWithRemotion: boolean;
	}
) => {
	if (typeof bucketName !== 'string') {
		throw new TypeError(
			`'bucketName' must be a string, but is ${JSON.stringify(bucketName)}`
		);
	}

	if (
		options.mustStartWithRemotion &&
		!bucketName.startsWith(REMOTION_BUCKET_PREFIX)
	) {
		throw new Error(
			`The bucketName parameter must start with ${REMOTION_BUCKET_PREFIX}.`
		);
	}

	if (
		!bucketName.match(
			/^(?=^.{3,63}$)(?!^(\d+\.)+\d+$)(^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$)/
		)
	) {
		throw new Error(`The bucket ${bucketName} `);
	}
};

export const parseBucketName = (
	name: string
): {
	region: AwsRegion | null;
} => {
	const parsed = name.match(
		new RegExp(`^${REMOTION_BUCKET_PREFIX}(.*)-([a-z0-9A-Z]+)$`)
	);
	const region = parsed?.[1] as AwsRegion;

	if (!region) {
		return {region: null};
	}

	const realRegionFound = AWS_REGIONS.find(
		(r) => r.replace(/-/g, '') === region
	);

	return {region: realRegionFound ?? null};
};

export const makeBucketName = (region: AwsRegion) => {
	return `${REMOTION_BUCKET_PREFIX}${region.replace(/-/g, '')}-${randomHash({
		randomInTests: false,
	})}`;
};
