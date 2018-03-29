import Vue from 'vue'
import Vuex from 'vuex'

import MainService from './MainService'
import PlayService from './PlayService'
import ApiService from './ApiService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    MainService,
    PlayService,
    ApiService
  }
})
