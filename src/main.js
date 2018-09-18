import '@babel/polyfill';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueSessionStorage from 'vue-sessionstorage';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(require('vue-cookies'));

Vue.use(VueSessionStorage);
Vue.use(VeeValidate);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
