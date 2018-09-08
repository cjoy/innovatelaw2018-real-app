import Vue from 'vue';
import Router from 'vue-router';
import Home from './containers/Home';
import Form from './containers/Form';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/form', component: Form, name: 'Form' },
    { path: '/faq', component: Home, name: 'FAQ' },
  ]
});