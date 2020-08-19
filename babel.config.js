/*
 * @Author: Xu Bai
 * @Date: 2020-07-05 11:13:51
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-08-19 22:55:28
 */
// 这是项目发布阶段需要用的babel插件
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组，展开运算符
    ...prodPlugins,
    // 路由懒加载
    '@babel/plugin-syntax-dynamic-import'
  ]
}
