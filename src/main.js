import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import axios from 'axios'
Vue.use(ElementUI)
// 解决axios的三个问题
// 1.每次请求都要带token值
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: localStorage.getItem('token')
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 2.每个页面都要引入axios
Vue.prototype.$axios = axios
// 3.每次请求都要带基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

Vue.config.productionTip = false

new Vue({
  // 载入router
  router,
  render: h => h(App)
}).$mount('#app')
