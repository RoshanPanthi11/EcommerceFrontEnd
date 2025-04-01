/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ["fakestoreapi.com"], // ✅ Add this line
    },
  };
  
  export default nextConfig;