import { defineConfig } from 'vitepress'
import ZHConfig from './zh.mts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Velto",
  description: "A web framework without virtual DOM.",
  outDir: "../dist",
  base: '/docs/',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/velto.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Velto' }],
  ],
  themeConfig: {
    logo: '/velto.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zebing/velto' }
    ]
  },
  locales: {
    zh: ZHConfig,
  }
})
