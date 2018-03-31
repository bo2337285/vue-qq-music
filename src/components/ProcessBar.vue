<template>
  <div class="process">
    <span class="process-label">{{currentTime}}</span>
    <div class="process-bar" ref="processBar">
      <div class="process-bar-wrapper" ref="process">
        <div class="process-bar-inner" :style="{width: handlerX + 'px'}"></div>
      </div>
      <div class="process-handler-wrapper" @touchstart.prevent="processTouchStart" @touchmove.prevent="processTouchMove" @touchend.prevent="processTouchEnd">
        <div class="process-handler" :style="{transform: 'translate3d('+ handlerX +'px,0,0)'}" @touchstart="handlerTouch" ref="processBtn"></div>
      </div>
    </div>
    <span class="process-label">{{duration}}</span>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from "vuex";
  export default {
    name: "process-bar",
    data() {
      return {
        initiated: false,
        isHandleTouch: false,
        handlerX: 0,
        PrevX: 0,
        startX: 0
      };
    },
    computed: {
      ...mapGetters([
        'playProcess', 'duration', 'currentTime'
      ]),
    },
    methods: {
      processTouchStart(e) {
        this.initiated = true;
        this.startX = e.touches[0].pageX
        if(!this.isHandleTouch){//没有拖拽的时候，直接跳
          let currX = e.touches[0].pageX - this.$refs.processBar.offsetLeft
          debugger
          this.$store.commit('updateProcess', currX / this.$refs.process.clientWidth )
        }
      },
      processTouchMove(e) {
        if (!this.initiated) return;
        if (!this.isHandleTouch) return;
        let deltaX = e.touches[0].pageX - this.startX
        this.handlerX = Math.min(this.$refs.process.clientWidth, Math.max(0, this.PrevX + deltaX))
      },
      processTouchEnd(e) {
        this.PrevX = this.handlerX
        // console.log(this.startX)
        if(this.isHandleTouch){//拖过来的
          // debugger
          this.$store.commit('updateProcess', this.handlerX / this.$refs.process.clientWidth )
        }
        this.initiated = false;
        this.isHandleTouch = false;
      },
      handlerTouch() {
        this.isHandleTouch = true;
      }
    },
    watch: {
      playProcess(val){
        // console.log(val)
        let currX = this.$refs.process.clientWidth * val
        if(!this.isHandleTouch){
          this.handlerX = currX
          this.PrevX = currX
        }
      }
    },
    components: {}
  };

</script>
<style lang='less' scoped>
  @import "../style/consts.less";
  @import "../style/theme.less";
  .process {
    position: relative;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .process-bar {
    position: relative;
    flex-grow: 1;
    height: 100%;
    // margin: 0 1rem;
  }
  .process-label{
    margin: 0 1rem;
  }
  .process-bar-wrapper {
    background-color: #a9acb1;
    border-radius: 15px; // display: block;
    height: 3px; // position: relative;
    // width: 100%;
    margin: auto;
    .POS-ABS-FULL
  }

  .process-bar-inner {
    .POS-ABS-FULL;
    background-color: @blue;
  }

  .process-handler-wrapper {
    .POS-ABS-FULL
  }

  .process-handler {
    background-color: #fff;
    border-radius: 100%;
    cursor: move;
    height: 30px;
    left: 0; // top: -13px;
    position: absolute;
    margin-left: -15px;
    width: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: all .1s;
  }

</style>
