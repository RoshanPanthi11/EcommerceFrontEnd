/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ["fakestoreapi.com"], 
    },
  };
  
  export default nextConfig;