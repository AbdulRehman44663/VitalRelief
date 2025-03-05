/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // output: "export",
  // images: {
  //   unoptimized: true,
  // },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
