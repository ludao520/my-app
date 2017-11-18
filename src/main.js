import 'babel-polyfill'
import Vue from 'vue'
import app from './app.vue'
import router from './router'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
import store from './store'
import './common/stylus/index.styl'
import loading from './common/img/loading.gif'
fastclick.attach(document.body)
Vue.use(vueLazyLoad,{
  loading
})
new Vue({
  el:'#app',
  render:h =>h(app),
  router,
  store
})
