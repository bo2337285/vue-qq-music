import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import store from './store'
import App from './App'
import router from './router'
import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueLazyload, {
    error: require('./assets/loading.svg'),
    loading: require('./assets/loading.svg'),
    attempt: 1
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
