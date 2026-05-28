import type { MineToolbarExpose, Plugin } from '#/global'

const pluginConfig: Plugin.PluginConfig = {
  install(app) {
    const toolbars = app.config.globalProperties.$toolbars as MineToolbarExpose
    toolbars.add({
      name: 'dailyQuote',
      title: '每日鸡汤',
      icon: 'material-symbols:format-quote-rounded',
      show: true,
      component: () => import('./components/daily-quote.vue'),
    })
    console.log('daily-quote plugin loaded')
  },
  config: {
    enable: true,
    info: {
      name: 'xjlldw/daily-quote',
      version: '1.0.0',
      author: 'xjlldw',
      description: '每日鸡汤语录顶部导航栏插件',
    },
  },
  views: [],
}

export default pluginConfig
