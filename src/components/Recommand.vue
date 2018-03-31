<template>
  <div class="container">
    <swiper :aspect-ratio="300/800" position="absolute" auto dots-class="custom-bottom" dots-position="center">
      <swiper-item v-for="(item, index) in slider" :key="index">
        <a :href="item.linkUrl" target="_blank">
          <img width="100%" height="100%" :src="item.picUrl" />
        </a>
      </swiper-item>
    </swiper>

    <h3 class="group-title">电台</h3>
    <flexbox wrap="wrap">
      <flexbox-item v-for="(item,index) in radioList" :key="index">
        <card >
          <div @click="getRadioList(item)" class="card-header" slot="header">
            <x-img class="card-img" :src="item.picUrl" />
            <div class="icon-play"></div>
          </div>
          <div @click="getRadioList(item)" class="card-content" slot="content">
            <h3 class="card-title">{{item.Ftitle}}</h3>
            <p class="card-author"></p>
          </div>
        </card>
      </flexbox-item>
    </flexbox>

    <h3 class="group-title">热门歌单</h3>
    <div class="hots-grid">
      <div class="hots-grid-item" v-for="(item,index) in songList" :key="index">
          <card >
            <div @click="getAlbum(item)" class="card-header" slot="header">
              <x-img class="card-img" :src="item.picUrl" />
              <div class="icon-play"></div>
            </div>
            <div @click="getAlbum(item)" class="card-content" slot="content">
              <h3 class="card-title">{{item.songListDesc}}</h3>
              <p class="card-author">{{item.songListAuthor}}</p>
            </div>
          </card>
      </div>
    </div>

  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Card, XImg, Swiper, SwiperItem, Group, CellBox } from "vux";
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  name: "Recommand",
  data() {
    return {
      radioList: [],
      slider: [],
      songList: [],
      msg: "Recommand"
    };
  },
  created: async function() {
    this.$store.commit("loadingCtrl",true);
    let res = await this.$store.dispatch("getRecommands");
    let _data = res.data.data;
    this.radioList = _data.radioList;
    this.slider = _data.slider;
    this.songList = _data.songList;
    this.$store.commit("loadingCtrl",false);
  },
  methods: {
    getRadioList: async function(item) {
      try {
        this.$store.commit("loadingCtrl",true);
        let res = await this.$store.dispatch("getRadioList", item.radioid);
        console.log(res.data);
        this.$store.commit("notify",{ text: "获取数据成功" });
      } catch (error) {
        this.$store.commit("notify",{ text: "获取数据失败" });
      }
      this.$store.commit("loadingCtrl",false);
    },
    getAlbum(item) {
      this.$router.push({ name: "cd", params: { id: item.id } });
    },
    ...mapMutations([ 'loadingCtrl','notify' ])
  },
  components: { Flexbox, FlexboxItem, Card, XImg, Swiper, SwiperItem, Group, CellBox }
};
</script>

<style lang="less" scoped>
  @import "../style/consts.less";
  .card-header {
    position: relative;
  }
  .card-content {
    padding: 0 7px 5px;
  }
  .card-img {
    width: 100%;
  }
  .card-title,
  .card-author {
    max-width: 10rem; /* 不设定宽度的话，会把父页面的弹性布局撑开 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    font-size: @FONT-SIZE-NORMAL;
    padding: 0;
    margin: 0;
  }
  .card-author {
    font-size: @FONT-SIZE-MINI;
    color: @FONT-COLOR-LIGHT;
  }

  .hots-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 8px;
    /* grid-template-columns: auto 8px auto; */
  }

  .group-title {
    margin: 8px 0 8px;
  }
</style>
