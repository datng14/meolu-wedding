import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  images: {
    qualities: [75, 85, 90, 100],
  },
};

export default withNextIntl(nextConfig);
