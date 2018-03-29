<template>
  <div id="app">
    <router-view name='main' />
    <!-- <router-view name='side' ref='child' /> -->
    <play />
  </div>
</template>

<script>
import Play from "@/components/play.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Play
  },
  computed: {
    ...mapState({
      loading: state => state.MainService.loading,
      notify: state => state.MainService.notify
    })
  },
  watch: {
    loading(val) {
      if (val) {
        this.$vux.loading.show({
          text: "正在更新数据"
        });
      } else {
        this.$vux.loading.hide();
      }
    },
    notify(opt) {
      this.$vux.toast.show(opt);
    }
  }
};
</script>
<style lang="less">
@import "./style/index.less";
</style>
