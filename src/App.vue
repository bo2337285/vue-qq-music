<template>
  <div id="app">
    <router-view name='main' />
    <!-- <router-view name='side' ref='child' /> -->
    <play />
  </div>
</template>

<script>
  import Play from "@/components/play.vue"
  export default {
    name: 'App',
    components: {
      Play
    }
  }

</script>
<style lang="less">
  @import './style/index.less';

</style>
