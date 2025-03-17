/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
        domains: [], // Optional, leave empty if using remotePatterns
        remotePatterns: [
            {
            protocol: 'https',
            hostname: '**', // Wildcard to allow all domains
            },
        ],
        },
};
  
export default nextConfig;
  
