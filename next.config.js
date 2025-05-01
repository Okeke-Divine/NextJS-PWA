const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: "/_offline", // default fallback for all document routes
  },
  runtimeCaching: [
    {
      // API: Match only GET requests to /api/*
      urlPattern: /^\/api\/.*$/,
      handler: 'NetworkFirst',
      method: 'GET',               // ← crucial: ignore POST
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24,  // 1 day
        },
        networkTimeoutSeconds: 10,      // fallback to cache if network hangs
      },
    },

    // Images
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },

    // Static Pages
    {
      urlPattern: ({ request }) => request.destination === "document",
      handler: "NetworkFirst",
      options: {
        cacheName: "page-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24,
        },
      },
    },

    {
      // Static Next.js assets (/_next/*)
      urlPattern: /^\/_next\/.*$/,
      handler: 'CacheFirst',
      options: { cacheName: 'static-resources' },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
});
