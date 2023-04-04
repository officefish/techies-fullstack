const path = require('node:path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {    
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, './src/'),
        '@assets': path.resolve(__dirname, './src/client/assets/'),
        '@components': path.resolve(__dirname, './src/client/components/'),
        '@services': path.resolve(__dirname, './src/client/services/'),
        '@models': path.resolve(__dirname, './src/client/models/'),
        '@utilities': path.resolve(__dirname, './src/client/utilities/')
      }
    }
    return config
  },
}

module.exports = nextConfig
