<template>
  <div>
    <flexbox orient="vertical">
      <flexbox-item>
        <blur :height=240 :blur-amount=40 :url="cd.logo">
          <div class="cd-wrap">
            <div class="cd-wrap-flex">
              <div class="cd-cover-container">
                <transition name="img-fade-in">
                  <p class="cd-cover">
                    <img :src="cd.logo" />
                  </p>
                </transition>
              </div>
              <div class="cd-info">
                <h2 class="cd-title">{{cd.dissname}}</h2>
                <div class="cd-author">
                  <img class="cd-author-logo" :src="cd.headurl" />{{cd.nickname}}
                </div>
                <div class="cd-visitnum">播放量：{{cd.visitnum | listenCount}}</div>
              </div>
            </div>
            <div>
              <x-button @click.native="addToPlaylist" :gradients="['#1D62F0', '#19D5FD']" type="primary" class="add-to-playlist">播放全部</x-button>
            </div>
          </div>
        </blur>
        <!-- <router-link :to="{name:'MainPage'}"> -->
        <div @click="backToHome" class="back-to-home-btn">
          <img src="../assets/icon-arrows.png" alt="">
        </div>
        <!-- </router-link> -->
      </flexbox-item>
      <flexbox-item>
        <group :gutter=0 class="music-list">
          <cell-box class="song-info" v-for="(item, index) in cd.songlist" :key="index">
            <p class="song-name">{{item.title}}{{item.subtitle}}</p>
            <p class="song-singer">{{item.singer | singerName}}{{item.album.title | subTitle}}</p>
          </cell-box>
        </group>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Group, CellBox, XButton, Blur, Flexbox, FlexboxItem } from "vux";
  import { DEFAULT_IMG } from "@/config/def";
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name: "Cd",
    data() {
      return {
        cd: {
          logo: DEFAULT_IMG,
          headurl: "",
          dissname: ""
        }
      };
    },
    created: async function () {
      try {
        this.$store.commit("loadingCtrl", true);
        let res = await this.$store.dispatch("getCdList", this.$route.params.id);
        let _data = res.data;
        if (_data.cdlist.length > 0) {
          this.cd = _data.cdlist[0]
        }
      } catch (error) {
        this.$store.commit("notify", { text: "获取数据失败" });
      }
      this.$store.commit("loadingCtrl", false);
    },
    computed:{
      ...mapState({
        playing: state => state.PlayService.playing,
      })
    },
    methods: {
      backToHome() {
        this.$router.go(-1);
      },
      addToPlaylist(){
        if (!!this.cd.songlist && this.cd.songlist.length>0) {
          this.$store.commit("concatToPlayList",this.cd.songlist)
          this.$store.commit("notify", { text: "已加入播放列表" });
          if (!this.playing) {
            this.$store.commit('playIndex',0)
          }
        }
      },
      ...mapMutations(['loadingCtrl'])
    },
    components: { Group, CellBox, XButton, Blur, Flexbox, FlexboxItem }
  };

</script>
<style lang="less">
  @import "../style/consts.less";
  .img-fade-in-enter-active {
    transition: all .5s;
  }

  .img-fade-in-enter {
    transform: translateX(900px);
  }

  .img-fade-in-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }

  .cd-cover {
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }

  .cd-cover img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }

  .cd-author {
    font-size: 14px;
  }

  .cd-author-logo {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border-radius: 24px;
    vertical-align: middle;
  }

  .cd-wrap-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cd-wrap {
    height: 100%;
    background: rgba(0, 0, 0, .5);
  }

  .cd-cover-container {
    padding: 1rem;
  }

  .cd-info {
    flex-grow: 1;
    padding-right: 1rem;
    color: #fff;
  }

  .cd-title {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 54px;
    margin-bottom: 5px;
  }

  .cd-author {
    margin-bottom: 5px;
  }

  .back-to-home-btn {
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

  .back-to-home-btn img {
    width: 12px;
    height: 12px;
    display: inline-block;
    transform: rotate(90deg);
  }
  button.add-to-playlist{
    border-radius: 99px;
    width: 50% !important;
  }
  .song-info{
    display: block !important;
  }
  .song-name{
  }
  .song-singer{
    font-size: @FONT-SIZE-MINI;
    color: @FONT-COLOR-LIGHT;
  }
</style>
