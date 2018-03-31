<template>
  <div>
    <!-- play-full -->
    <transition name="play-slide">
      <div v-show="play_full" class="play-full">
        <!-- <blur :blur-amount="40" class="play-bg-blur" :height="bg_height" :url="play_full?coverImgUrl:''" /> -->
        <div class="play-bg-blur" :style="{backgroundImage:'url('+coverImgUrl+')'}"></div>
        <div class="play-bg-wrap">
          <div class="play-page-hide-btn" @touchend.prevent.stop="playFullCtrl" @click="playFullCtrl">
            <img src="../assets/icon-arrows.png" alt="">
          </div>
          
          <div class="play-header">
            <p class="curr-song-cover">
              <img :src="coverImgUrl" />
            </p>
            <p class="song-name">{{song.title}}{{song.subtitle}}</p>
            <p class="song-singer">{{song.singer | singerName}}{{song.album.title | subTitle}}</p>
          </div>
          <div class="play-body">
              <lyric/>
          </div>
          <div class="play-footer">
              <process-bar  />
            <div class="play-ctrl">
              <img @click="changePlayMode" class="play-mode play-icon" :src="iconPlayMode"/>
              <div class="play-inner-ctrl" >
                <img @click="playPrev" class="play-prev play-icon" :src="iconPrev"/>
                <img @click="playCtrl" class="play-icon play-icon" :src="playing?iconPause:iconPlay"/>
                <img @click="playNext" class="play-next play-icon" :src="iconNext"/>
              </div>
              <img class="play-list play-icon" :src="iconPlaylist"/>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- play-bar -->
    <div v-show="!play_full" class="play-bar">
      <audio :src="dataUrl" ref="audio" @play="play"
        @timeupdate="updateTime" @ended="playAutoEnd" autoplay></audio>
      <div @touchend.prevent.stop="playFullCtrl" @click="playFullCtrl" class="play-bar-cover-container">
        <img class="play-bar-cover" :src="coverImgUrl" />
      </div>
      <div @touchend.prevent.stop="playFullCtrl" @click="playFullCtrl" class="play-bar-text">
        {{song.name}}
      </div>
      <img class="play-bar-button" :src="playing?iconPause:iconPlay" @touchend.prevent.stop="playCtrl" @click="playCtrl">
    </div>
  </div>
</template>

<script>
  import { Blur, XImg, XButton, Flexbox, FlexboxItem,Range  } from "vux";
  import { DEFAULT_SONG,DEFAULT_IMG,PLAY_MODE_IMG,PLAY_IMG,PAUSE_IMG,PLAYLIST_IMG,NEXT_IMG,PREV_IMG } from "@/config/def";
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import ProcessBar from './ProcessBar'
  import Lyric from './Lyric'
  export default {
    name: "play",
    data() {
      return {
        curr_cover: DEFAULT_IMG,
        iconPlay: PLAY_IMG,
        iconPause: PAUSE_IMG,
        iconNext: NEXT_IMG,
        iconPrev: PREV_IMG,
        iconPlaylist: PLAYLIST_IMG
      };
    },
    created () {
      //test song
      // this.$store.commit('addToPlayList',DEFAULT_SONG)
      // this.$store.commit('playIndex',0)
    },
    components: { Blur, XImg, Flexbox, FlexboxItem,Range, ProcessBar,Lyric },
    computed: {
      bg_height: function () {
        return window.innerHeight
      },
      iconPlayMode: function () {
        return PLAY_MODE_IMG[this.playMode]
      },
      ...mapGetters([
         'dataUrl','playProcess','duration','currentTime','coverImgUrl'
      ]),
      ...mapState({
        playing: state => state.PlayService.playing,
        playMode: state=>state.PlayService.playMode,
        play_full: state => state.PlayService.play_full,
        song: state => state.PlayService.song,
        setCurrentTime: state => state.PlayService.setCurrentTime,
      })
    },
    methods: {
      playFullCtrl() {
        this.play_full ? this.$store.commit('playFullDisable') : this.$store.commit('playFullEnable');
      },
      playCtrl() {
        this.playing ? this.$store.commit('pause') : this.$store.commit('play');
      },
      updateTime() {
        let ele = this.$refs.audio;
        if(this.playing){
          this.$store.commit('updateCurrentTime', parseInt(ele.currentTime))
          this.$store.commit('updateDuration', parseInt(ele.duration))
        }
      },
      playAutoEnd: async function(){
        this.$store.commit('playEnd')//先停再下一首
        this.$store.commit('playContinue')
        await new Promise((resolve)=>setTimeout(() => {resolve() }, 500)) ;
        this.$store.commit('playStart')
      },
      playNext: async function(){
        this.$store.commit('playEnd')//先停再下一首
        this.$store.commit('playNext')
        await new Promise((resolve)=>setTimeout(() => {resolve() }, 500)) ;
        this.$store.commit('playStart')
      },
      playPrev: async function(){
        this.$store.commit('playEnd')//先停再下一首
        this.$store.commit('playPrev')
        await new Promise((resolve)=>setTimeout(() => {resolve() }, 500)) ;
        this.$store.commit('playStart')
      },
      ...mapMutations([
        'play', 'pause','addToPlayList','playIndex','changePlayMode'])
    },
    watch:{
      setCurrentTime(val){
        let ele = this.$refs.audio;
        ele.currentTime = val;
      },
      playing(val){
        console.log("change playing")
        val? this.$refs.audio.play() : this.$refs.audio.pause()
      }
    }
  };

</script>
<style lang="less" scoped>
  @import "../style/consts.less";
  .play-full {
    .POS-ABS-FULL;
    position: fixed;
    background: darkslategray;
    z-index: 10;
  }

  .curr-song-cover {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }

  .curr-song-cover img {
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
  .play-bg-blur{
    .POS-ABS-FULL;
    background-repeat: no-repeat;
    background-size:150% 150%;  
    background-position: center;
    // background-attachment: fixed;
    -webkit-filter:blur(50px);
  }
  .play-bg-wrap {
    .POS-ABS-FULL;
    background-color: rgba(255,255,255, .6);
    display: flex;
    flex-direction: column;
  }
  .play-body{
    flex-grow: 1;
    position: relative;
  }
  .play-ctrl{
    display: flex;
  }
  .play-inner-ctrl{
    flex-grow: 1;
    text-align: center;
  }
  .play-icon{
    width: 26px;
    height: 26px;
    margin: 1rem;
  }
  .play-process{
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
  .play-process-label{
    margin: 0 1rem;
  }
  .play-process-bar{
    flex-grow: 1;
    margin: 0 !important;
  }
  .song-name{
    text-align: center;
    font-size: @FONT-SIZE-LARGE;
    color: @FONT-COLOR-HEAVY;
    padding: 0 1rem;
  }
  .song-singer{
    text-align: center;
    font-size: @FONT-SIZE-MINI;
    color: @FONT-COLOR-LIGHT;
    padding: 0 1rem;
  }

</style>
