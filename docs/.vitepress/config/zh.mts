
export default {
  label: '简体中文',
  themeConfig: {
    // nav: [
    //   { text: '指南', link: '/zh/guide/introduction' },
    //   { text: '参考', link: '/zh/reference/' }
    // ],
    sidebar: {
      '/zh/guide/': { base: '/zh/guide/', items: [
        {
          text: '开始',
          items: [
            { text: '简介', link: 'introduction' },
            { text: '快速开始', link: 'getting-started' },
          ]
        },
      ] },
      // '/zh/reference/': { base: '/zh/reference/', items: [] }
    },
  },
}
