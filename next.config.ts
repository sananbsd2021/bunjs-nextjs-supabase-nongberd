/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com',
              port: '',
              pathname: '/u/**',
          },
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
        },
      ],
  },
  
}

module.exports = nextConfig
