import Vue from 'vue'
import VueRouter from 'vue-router'

// 第三步 组件
import Login from './components/login/login.vue'
import Home from './components/home/home.vue'
import User from './components/user/user.vue'
import Roles from './components/roles/roles.vue'
import rights from './components/rights/rights.vue'
Vue.use(VueRouter)

// 路由实例化 并导出
const router = new VueRouter({
  // 第二步规则
  routes: [
    // 进到页面显示的就是登录页
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/user', component: User },
        { path: '/roles', component: Roles },
        { path: '/rights', component: rights }
      ]
    }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果是登录页 则默认允许访问
  if (to.path === '/login') {
    next()
  } else {
    // 如果能获取到token的值 则允许访问 获取不到则拦截到到login页
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
export default router
