<template>
  <div class="lyric">
    <span class="label">{{msg}}</span>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  name: "lyric",
  data () {
    return {
        msg:"歌词功能待实现……"
    };
  },
  components: {}
}

</script>
<style lang='less' scoped>
  @import '../style/consts.less';
  .lyric{
    .POS-ABS-FULL;
  }
  .label{
    .POS-ABS-FULL;
    width: 200px;
    height: 200px;
    margin: auto;
    text-align: center;
  }
</style>