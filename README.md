### 技术栈

- vue3.5 + ts + vite + vant

### 模板功能点

1. 版本更新提示

2. 代码混淆

   * 内置自定义代码片段进行构建产物混淆的 vite 插件
     * [@mohamad-supangat/vite-plugin-gnirts](https://www.npmjs.com/package/@mohamad-supangat/vite-plugin-gnirts) 该包只支持对整个文件进行处理
   * 全局代码混淆：vitePluginBundleObfuscator

3. 登录成功后自动进入用户上一次进入的页面（token过期）

4. 微信授权基础逻辑

5. 全局基础布局

   - 布局信息在整个 app 中都可访问（维护到了 store 中），让页面布局更加灵活

     > 更加灵活？
     >
     > - 因为现代 h5 开发很多都是需要嵌入到 小程序 或者 app 中，有时需要根据不同的环境对布局或样式进行调整，组件中可以根据当前的布局信息进行准确的调整。

   - 对 tabbar 进行样式复写，更加符合 ui 设计

6. 请求工具函数的封装

   - 支持缓存模式和 cancel 模式

7. 基础 hooks 的封装

### 内部处理常见的 c 端问题：

1. ios focus 表单，页面自动放大问题
2. 计算真实的视口单位高度：在不同的浏览器中，如果使用直接使用 vh 单位，会包含浏览器自带的工具栏、地址栏等元素的高度
   * 相关 css 变量
     * --vh 类比 1vh
     * --fullHeight 类比 100vh
