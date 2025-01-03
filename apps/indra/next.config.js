const { composePlugins, withNx } = require('@nx/next');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		// Set this to true if you would like to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
};

const plugins = [
	withNx,
	withBundleAnalyzer, // Add Bundle Analyzer plugin here
];

module.exports = composePlugins(...plugins)(nextConfig);
