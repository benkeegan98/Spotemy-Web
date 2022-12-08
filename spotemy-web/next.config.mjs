/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    // This is the property you need to add
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
}

export default nextConfig