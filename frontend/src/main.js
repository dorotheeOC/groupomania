import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'

Vue.use(vueResource)
Vue.http.options.root = 'http://localhost:3000/api/';

Vue.http.interceptors.push((request) => {

  let jwt = JSON.parse(localStorage.getItem("jwt"))

  if (jwt) {
    request.headers.set('Authorization', `Bearer ${jwt.token}`);
  } 
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')