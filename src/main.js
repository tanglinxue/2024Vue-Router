import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const vm = new Vue({
  name: 'root',
  router,
  render: h => h(App)
}).$mount('#app')
