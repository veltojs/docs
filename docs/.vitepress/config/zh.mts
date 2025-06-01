
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
            { text: '节点引用', link: 'basic-ref' },
            { text: '生命周期', link: 'basic-lifecycle' },
            { text: 'Props', link: 'basic-props' },
            { text: '插槽 (Slot)', link: 'basic-slot' },
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
        {
          text: '组件',
          items: [
            { text: 'defineAsyncComponent', link: 'basic-define-async-component' },
          ]
        },
      ] },
      // '/zh/reference/': { base: '/zh/reference/', items: [] }
    },
  },
}
