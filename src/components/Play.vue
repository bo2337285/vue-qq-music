<template>
  <div>
    <transition name="play-slide">
      <div v-show="play_full" class="play-full">
        <flexbox orient="vertical">
          <flexbox-item>
            <blur :blur-amount="40" :url="curr_cover">
              <p class="center">
                <img :src="curr_cover" />
              </p>
            </blur>
            <div class="play-page-hide-btn" @touchend.prevent.stop="playFullCtrl" @click="playFullCtrl">
              <img src="../assets/icon-arrows.png" alt="">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="music-info"></div>
            <div class="lyric"></div>
            <div class="music-ctrl"></div>
          </flexbox-item>
        </flexbox>
      </div>
    </transition>
    <div v-show="!play_full" class="play-bar">
			<audio 
               :src="song.dataUrl"
               @timeupdate="updateTime($event)"
               @ended="playContinue($event)"
               autoplay></audio>
      <div @touchend.prevent.stop="playFullCtrl"
			 @click="playFullCtrl" class="play-bar-cover-container">
        <img class="play-bar-cover" :src="curr_cover" />
      </div>
      <div @touchend.prevent.stop="playFullCtrl"
			 @click="playFullCtrl" class="play-bar-text">
        {{song.name}}
      </div>
      <img class="play-bar-button" :src="playing?iconPause:iconPlay"
			 @touchend="playCtrl" @click="playCtrl">
    </div>
  </div>
</template>

<script>
  import { Blur, XImg, XButton, Flexbox, FlexboxItem } from "vux";
  import { DEFAULT_IMG } from "@/config/def";
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    name: "play",
    data() {
      return {
        curr_cover: DEFAULT_IMG,
        iconPlay: require('@/assets/icon-play.png'),
        iconPause: require('@/assets/icon-pause.png')
      };
    },

    components: { Blur, XImg, Flexbox, FlexboxItem },
    computed: {
      ...mapState({
        playing: state => state.PlayService.playing,
        play_full: state => state.PlayService.play_full,
        song: state => state.PlayService.song
      })
    },
    methods: {
      playFullCtrl() {
        this.play_full ? this.$store.commit('playFullDisable') : this.$store.commit('playFullEnable');
      },
      playCtrl() {
        this.playing ? this.$store.commit('pause') : this.$store.commit('play');
			},
			updateTime(e) {
				let ele = e.currentTarget;
        this.$store.commit('updateCurrentTime', parseInt(ele.currentTime))
        this.$store.commit('updateDuration', parseInt(ele.duration))
      },
      ...mapMutations([
        'play', 'pause', 'playContinue'
      ])
    }
  };

</script>
<style scoped>
  .play-full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: darkslategray;
    z-index: 10;
  }

  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }

  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }

  .page-slide-enter-active {
    transition: all 0.3s ease;
  }

  .page-slide-leave-active {
    transition: all 0.3s ease-out;
  }

  .page-slide-enter,
  .page-slide-leave-active {
    transform: translateX(100%);
  }

  .fade-enter-active {
    transition: all 0.3s ease;
  }

  .fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .play-slide-enter-active {
    transition: all 0.3s ease;
  }

  .play-slide-leave-active {
    transition: all 0.3s ease-out;
  }

  .play-slide-enter,
  .play-slide-leave-active {
    transform: translateY(100vh);
  }

  .play-page-hide-btn {
    width: 25px;
    height: 25px;
    top: 27px;
    left: 11px;
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
  }

  .play-page-hide-btn img {
    width: 12px;
    height: 12px;
    display: inline-block;
  }

  .play-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: -webkit-linear-gradient(top, #f9f9f9, #f3f3f3);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
  }

  .play-bar-cover-container {
    width: 37.5px;
    height: 37.5px;
    padding-left: 15px;
    cursor: pointer;
  }

  .play-bar-cover {
    width: 37.5px;
    height: 37.5px;
    border-radius: 5px;
    display: inline-block;
  }

  .play-bar-text {
    flex-grow: 1;
    padding-left: 10px;
    cursor: pointer;
		width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
  }

  .play-bar-button {
    width: 20px;
    height: 20px;
    padding-right: 15px;
    cursor: pointer;
  }

</style>
