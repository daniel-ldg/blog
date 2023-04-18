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
			{
				protocol: "https",
				hostname: "ik.imagekit.io",
			},
		],
	},
};

module.exports = nextConfig;
