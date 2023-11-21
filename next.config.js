/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**'
            },
            {
                protocol: 'https',
                hostname: 'yfmukm0ono1f1oxb.public.blob.vercel-storage.com',
                port: '',
                pathname: '/*'
            },
            {
                protocol: 'https',
                hostname: 'yfmukm0ono1f1oxb.public.blob.vercel-storage.com',
                port: '',
                pathname: '/avatar/*',
            },
            {
                protocol: 'https',
                hostname: 'yfmukm0ono1f1oxb.public.blob.vercel-storage.com',
                port: '',
                pathname: '/logo/*',
            },
            {
                protocol: 'https',
                hostname: 'yfmukm0ono1f1oxb.public.blob.vercel-storage.com',
                port: '',
                pathname: '/imgs/*',
            },
            {
                protocol: 'https',
                hostname: 'yfmukm0ono1f1oxb.public.blob.vercel-storage.com',
                port: '',
                pathname: '/cover/*',
            }

        ]
    }
}

module.exports = nextConfig
