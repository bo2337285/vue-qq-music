<template>
  <div>
    <flexbox orient="vertical">
      <flexbox-item>
        <blur :blur-amount=40 :url="cd.logo">
          <div class="cd-wrap">
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
        </blur>
        <!-- <router-link :to="{name:'MainPage'}"> -->
        <div @click="backToHome" class="back-to-home-btn">
          <img src="../assets/icon-arrows.png" alt="">
        </div>
        <!-- </router-link> -->
      </flexbox-item>
      <flexbox-item>
        <div class="music-info"></div>
        <div class="lyric"></div>
        <div class="music-ctrl"></div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Blur, Flexbox, FlexboxItem } from "vux";
  import { DEFAULT_IMG } from "@/config/def";
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
    created() {
      this.$store
        .dispatch("getCdList", this.$route.params.id)
        .then(response => {
            let _data = response.data;
            var curr_cd = {};
            if (_data.cdlist.length > 0) {
              curr_cd = _data.cdlist[0]
            }
            this.cd = curr_cd
            // console.log(_data);
          },
          responce => {
            this.$vux.toast.show({
              type: "text",
              position: "top",
              text: "获取数据失败"
            });
          })
    },
    methods: {
      backToHome(){
        this.$router.push('/');
      }
    },
    components: {
      Blur,
      Flexbox,
      FlexboxItem
    },
    filters: {
      listenCount: num => {
        return Math.round(num / 1000) / 10 + '万'
      }
    }
  };

</script>
<style>
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
  .cd-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: rgba(0,0,0,.5);
  }
  .cd-cover-container{
    padding: 1rem;
  }
  .cd-info{
    flex-grow: 1;
    padding-right: 1rem;
    color: #fff;
  }
  .cd-title{
    overflow: hidden;
    text-overflow: ellipsis;
    height: 54px;
    margin-bottom: 5px;
  }
  .cd-author{
    margin-bottom: 5px;
  }
  .back-to-home-btn{
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
  .back-to-home-btn img{
    width: 12px;
    height: 12px;
    display: inline-block;
    transform: rotate(90deg);
  }

</style>
