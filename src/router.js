import Vue from 'vue'
import VueRouter from 'vue-router'

// 第三步 组件
import Login from './components/login/login.vue'
import Home from './components/home/home.vue'
Vue.use(VueRouter)

// 路由实例化 并导出
const router = new VueRouter({
  // 第二步规则
  routes: [
    // 进到页面显示的就是登录页
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
export default router
