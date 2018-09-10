import 'es6-promise/auto'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueGmaps from 'vue-gmaps'
import router from './router';
import 'vue-material/dist/vue-material.min.css'
import './assets/sass/main.scss';
import App from './App.vue'

Vue.use(VueGmaps, {
  key: 'AIzaSyB_hWH944ixwXX1x3KXIAXynY99IDfR2FQ'
})

Vue.config.productionTip = false
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
