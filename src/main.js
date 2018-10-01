import Vue from 'vue'
import App from './App.vue'
import VueGeolocation from 'vue-browser-geolocation'
import VueResource from 'vue-resource'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)
Vue.use(VueGeolocation)
Vue.use(VueResource)

import UserInfo from '@/components/UserInfo'

Vue.config.productionTip = false

// new VueRouter({
//   routes: [
//     {path: '/user', component: UserInfo}
//   ]
// })

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
