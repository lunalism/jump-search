/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY,
  },
};

module.exports = nextConfig;