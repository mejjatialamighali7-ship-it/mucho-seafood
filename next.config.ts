import type { NextConfig } from "next";

/**
 * Politique de sécurité du contenu : seules les ressources du site lui-même sont
 * autorisées, plus Google Analytics (après consentement) et le plan Google Maps
 * (chargé au clic). Les scripts en ligne restent permis : Next.js en a besoin
 * pour afficher les pages statiques.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "frame-src https://maps.google.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Force le HTTPS pendant 2 ans, sous-domaines compris.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    // Les photos sont préparées à l'avance en WebP et en 3 largeurs par `npm run images`.
    // Le chargeur choisit la bonne largeur sans aucun calcul côté serveur (rapide sur Render).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 828, 1200, 1920],
    imageSizes: [96, 256],
  },
  poweredByHeader: false,
  async headers() {
    return [
      // La CSP bloquerait le rechargement à chaud en développement.
      { source: "/:path*", headers: isProd ? securityHeaders : securityHeaders.slice(1) },
      {
        source: "/images/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/:file(og-image.jpg|carte-mucho.pdf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/rgpd", destination: "/confidentialite", permanent: true },
      { source: "/cookies", destination: "/confidentialite#cookies", permanent: true },
      { source: "/conditions-generales", destination: "/cgu", permanent: true },
    ];
  },
};

export default nextConfig;
