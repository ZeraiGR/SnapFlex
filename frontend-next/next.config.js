/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: config => {
      config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
      }
      return config
  },
  async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://backend:5000/api/:path*`,
			},
		]
	},
  output: "standalone",
}

module.exports = nextConfig
