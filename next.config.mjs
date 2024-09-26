/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "logo.wine",
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
