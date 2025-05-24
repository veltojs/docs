
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
            { text: '简介', link: 'start-introduction' },
            { text: '快速开始', link: 'start-getting-started' },
            { text: '性能对比', link: 'start-performance' },
          ]
        },
        {
          text: '基础',
          items: [
            { text: 'JSX 语法', link: 'basic-jsx' },
            { text: 'defineAsyncComponent', link: 'basic-define-async-component' },
          ]
        },
        {
          text: '响应式',
          items: [
            { text: 'ref', link: 'reactive-ref' },
            { text: 'computed', link: 'reactive-computed' },
            { text: 'watch', link: 'reactive-watch' },
          ]
        },
      ] },
      // '/zh/reference/': { base: '/zh/reference/', items: [] }
    },
  },
}
