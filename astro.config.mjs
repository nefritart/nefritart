// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nefritart.eu',
  i18n: {
    locales: ['cs', 'en', 'de', 'ru'],
    defaultLocale: 'cs',
    routing: { prefixDefaultLocale: false },
  },
});
