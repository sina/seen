// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.thxsina.com',
  base: '.',
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});

/*
  For github page hosting with a custom domain

  - add a CNAME record for preferred subdomain
  - add redirects for www and root

    CNAME     blog    sina.github.io            30m TTL
    Redirect  www     http://blog.thxsina.com   Unmasked
    Redirect  @       http://blog.thxsina.com   Unmasked
    

*/