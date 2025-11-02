'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter as useIntlRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useIntlRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const switchLocale = (newLocale: 'vi' | 'en') => {
    // Remove the current locale prefix from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.replace(pathnameWithoutLocale, { locale: newLocale });
  };

  return (
    <div className="fixed top-3 right-3 md:top-4 md:right-4 z-50 flex gap-1.5 md:gap-2">
      <button
        onClick={() => switchLocale('vi')}
            className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full transition-all shadow-md ${
              locale === 'vi'
                ? 'text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            style={locale === 'vi' ? { backgroundColor: 'var(--theme-primary)' } : undefined}
      >
        {t('vietnamese')}
      </button>
      <button
        onClick={() => switchLocale('en')}
            className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full transition-all shadow-md ${
              locale === 'en'
                ? 'text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            style={locale === 'en' ? { backgroundColor: 'var(--theme-primary)' } : undefined}
      >
        {t('english')}
      </button>
    </div>
  );
}

