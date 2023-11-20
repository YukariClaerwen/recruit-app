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
                hostname: 'a8mmiqeghdym61ck.public.blob.vercel-storage.com',
                port: '',
                pathname: '/*'
            },
            {
                protocol: 'https',
                hostname: 'a8mmiqeghdym61ck.public.blob.vercel-storage.com',
                port: '',
                pathname: '/avatar/*',
            },
            {
                protocol: 'https',
                hostname: 'a8mmiqeghdym61ck.public.blob.vercel-storage.com',
                port: '',
                pathname: '/logo/*',
            },
            {
                protocol: 'https',
                hostname: 'a8mmiqeghdym61ck.public.blob.vercel-storage.com',
                port: '',
                pathname: '/imgs/*',
            },
            {
                protocol: 'https',
                hostname: 'a8mmiqeghdym61ck.public.blob.vercel-storage.com',
                port: '',
                pathname: '/cover/*',
            }

        ]
    }
}

module.exports = nextConfig
