import Vue from 'vue'

import API from '@/config/api'
import {API_TRANSFER_URL} from '@/config/def'

function apiFactory(api) {
  return (id = null) => Vue.http.jsonp(
    api.url, {
      params: api.params(id),
      jsonp: api.jsonp
    }
  )
}

function apiTransferFactory(api) {
  return !!api.jsonp ? (id = null) => Vue.http.jsonp(
      API_TRANSFER_URL, {
        params: {
          url: api.url,
          headers: api.headers(id),
          params: Object.assign({},  api.params(id), {jsonp: api.jsonp}),
          jsonp: api.jsonp
        },
        jsonp: api.jsonp
      }
    ) :
    (id = null) => Vue.http.get(
      API_TRANSFER_URL, {
        params: {
          url: api.url,
          headers: api.headers(id),
          params: api.params(id)
        }
      }
    )
}

export default {
  actions: {
    getRankSongs({}, id) {
      return apiFactory(API.rank_songs)(id)
    },
    getRadioList({}, id) {
      return apiFactory(API.radio)(id)
    },
    getRankList({}) {
      return apiFactory(API.rank_list)()
    },
    getAlbum({}, id) {
      return apiFactory(API.album)(id)
    },
    getSingerInfo({}, id) {
      return apiFactory(API.singer_info)(id)
    },
    search({}, key) {
      return apiFactory(API.search)(key)
    },
    getHotKey({}) {
      return apiFactory(API.hotkey)()
    },
    getRecommands({}) {
      return apiFactory(API.home_page_data)()
    },
    getCdList({}, id) {
      return apiTransferFactory(API.cd)(id)
    },
    getLyric({}, id) {
      return Vue.http.jsonp('https://api.darlin.me/music/lyric/' + id + '/', {
        jsonp: 'callback'
      })
    }
  }
}
