import 'es6-promise/auto'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import router from './router';
import 'vue-material/dist/vue-material.min.css'
import './assets/sass/main.scss';

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
