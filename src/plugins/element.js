import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// Message弹窗组件、有点区别，需要全局挂载

// 注册为全局可用的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
