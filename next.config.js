/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		swcPlugins: [["next-superjson-plugin", {}]],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.filestackcontent.com",
			},
		],
	},
};

module.exports = nextConfig;
