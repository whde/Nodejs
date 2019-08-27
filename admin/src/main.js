import Vue from 'vue'
import App from './App.vue'
import router from './router'

// elementUI
import './plugins/element.js'


Vue.config.productionTip = false;

// axios
import http from "./plugins/https";
Vue.prototype.$http = http;

import userStorage from "./storage/UserStorage";
Vue.prototype.$userStorage = userStorage;

// import store from "./store/store";
// Vue.prototype.$store = store;

new Vue({
  router,
  route: h => h(App),
}).$mount('#app');


