import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import i18n from './i18n'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
