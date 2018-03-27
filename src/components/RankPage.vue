<template>
  <div class="container">
    <group v-for="(item,index) in topList" :key="index">
      <cell-box primary="title" class="rank-cell" is-link>
        <flexbox>
          <flexbox-item :span="3">
            <x-img class="rank-img" :src="item.picUrl" />
            <span class="rank-listen-count">{{item.listenCount | listenCount}}</span>
          </flexbox-item>
          <flexbox-item>
            <span class="rank-label">
              <h4 class="rank-label-title">{{item.topTitle}}</h4>
              <p class="rank-label-content" v-for="(song,index) in item.songList" :key="index">
                {{index + 1}}
                <span class="rank-label-songname">{{song.songname}}</span> -{{song.singername}}
              </p>
            </span>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>
  </div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  XImg,
  Group,
  Cell,
  CellFormPreview,
  CellBox
} from "vux";
export default {
  name: "RankPage",
  data() {
    return {
      loading: false,
      topList: []
    };
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("getRankList")
      .then(
        response => {
          this.$vux.toast.show({
            type: "text",
            position: "top",
            text: "获取数据成功"
          });
          let _data = response.data.data;
          this.topList = _data.topList;
        },
        responce => {
          this.$vux.toast.show({
            type: "text",
            position: "top",
            text: "获取数据失败"
          });
        }
      )
      .then(responce => {
        this.loading = false;
      });
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
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    XImg,
    Group,
    Cell,
    CellFormPreview,
    CellBox
  },
  filters: {
      listenCount: num=> {
        return Math.round(num / 1000) / 10 + '万'
      }
    }
};
</script>
<style>
.rank-cell {
  padding: 0px !important;
}

.rank-img {
  /* width: 30%; */
}

.rank-label {
  width: 0;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}
.rank-label-title {
  margin-bottom: 5px;
}
.rank-label-content {
  padding-right: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rank-label-title,
.rank-label-songname {
  color: black;
}

.rank-listen-count {
  position: absolute;
  left: 5px;
  bottom: 7px;
  line-height: 12px;
  color: #fff;
  opacity: 0.6;
  font-size: 9px;
  z-index: 10;
}
</style>
