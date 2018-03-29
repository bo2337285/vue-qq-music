export default {
  state: {
    loading: false, //全局loading控制
    notify: {
      type: "text",
      position: "top",
      text: ""
    } //全局消息控制
  },
  mutations: {
    loadingCtrl(state, bool) {
      state.loading = bool;
    },
    notify(state, notifyOpts) {
      state.notify = Object.assign({},  state.notify, notifyOpts);
    }
  },
  actions: {},
  getters: {}
}
