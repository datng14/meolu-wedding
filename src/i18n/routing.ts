import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'always' // Always show locale in URL: /vi and /en
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

