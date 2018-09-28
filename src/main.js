import Vue from 'vue'
import App from './App.vue'
import VueGeolocation from 'vue-browser-geolocation'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VueGeolocation)
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
