<template>
  <div id="app">
    <router-view name='main' />
    <router-view name='side' ref='child' />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }

</script>
<style lang="less">
  @import './style/index.less';
</style>

