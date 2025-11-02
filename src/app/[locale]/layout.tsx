import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Lora } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import '../globals.css';

// Main font - matching sample's Lora font
const lora = Lora({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

// Script font - High Spirited (local font)
const highSpirited = localFont({
  src: '../../../public/fonts/HighSpirited.woff2',
  variable: '--font-script',
  display: 'swap',
  fallback: ['cursive'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Wedding Invitation',
  description: 'Wedding invitation website',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${lora.variable} ${highSpirited.variable}`}>
      <body className='antialiased font-serif'>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
