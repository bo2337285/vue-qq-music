<template>
  <div>
    <search @result-click="resultClick" :results="results" v-model="search_value" auto-scroll-to-top @on-submit="onSearchSubmit"
      @on-change="getSearchResult" ref="search">
      <box gap="10px 10px">
        <x-button v-for="item in search_keyword" :key="item.title" @click.native="onSearchKeywordClick(item.title)" mini>{{item.title}}</x-button>
      </box>
    </search>
    <tab>
      <tab-item v-for="item in tabs" :key="item.name" :selected="item.name === tabs_selected" @on-item-click="onTabItemClick(item.name)">
          {{item.title}}
      </tab-item>
    </tab>
      <keep-alive>
        <router-view/>
      </keep-alive>
  </div>
</template>

<script>
import {
  XButton,
  Group,
  CellBox,
  Search,
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Box
} from "vux";

export default {
  name: "Main",
  data() {
    return {
      search_value: "",
      search_keyword: [
        {
          title: "推荐"
        },
        {
          title: "排行榜"
        }
      ],
      tabs_selected: "",
      tabs: [
        {
          name: "recommand",
          title: "推荐"
        },
        {
          name: "rank",
          title: "排行榜"
        }
      ],
      results: []
    };
  },
  methods: {
    onSearchKeywordClick(title) {
      this.search_value = title;
      this.onSearchSubmit();
    },
    onTabItemClick(name) {
      this.tabs_selected = name;
      this.$router.push(name);
    },
    resultClick(item) {
      // window.alert("you click the result item: " + JSON.stringify(item));
      this.search_value = item.title;
      this.onSearchSubmit();
    },
    getSearchResult(val) {
      this.results = val ? getSearchResult(this.search_value) : [];
    },
    onSearchSubmit() {
      this.$refs.search.setBlur();
      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: this.search_value
      });
    }
  },
  created () {
    if (this.tabs.length > 0) {
      let _name = this.$route.name;
      let _array = this.tabs.filter(item => item.name == _name);
      this.tabs_selected = _array.length > 0 ? _name : this.tabs[0].name;
    }
  },
  components: { Group, CellBox, Search, Tab, TabItem, XButton, Flexbox, FlexboxItem, Box }
};

function getSearchResult(val) {
  let rs = [];
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    });
  }
  return rs;
}
</script>
