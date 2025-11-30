'use client';

import { useRouter as useIntlRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

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
    <div className='fixed top-3 right-3 md:top-4 md:right-4 z-50 flex gap-1.5 md:gap-2'>
      <button
        onClick={() => switchLocale('vi')}
        className={`w-8 h-8 p-2 text-xs rounded-full transition-all shadow-md cursor-pointer ${
          locale === 'vi'
            ? 'text-white'
            : 'bg-white/80 text-gray-700 hover:bg-white'
        }`}
        style={
          locale === 'vi'
            ? { backgroundColor: 'var(--theme-primary)' }
            : undefined
        }
      >
        {t('vietnamese')}
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`w-8 h-8 p-2 text-xs rounded-full transition-all shadow-md cursor-pointer ${
          locale === 'en'
            ? 'text-white'
            : 'bg-white/80 text-gray-700 hover:bg-white'
        }`}
        style={
          locale === 'en'
            ? { backgroundColor: 'var(--theme-primary)' }
            : undefined
        }
      >
        {t('english')}
      </button>
    </div>
  );
}
