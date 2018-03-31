export const PLAY_MODE_IMG = [
  require('../assets/icon-SINGLE.svg'),
  require('../assets/icon-SEQUENTIAL.png'),
  require('../assets/icon-RANDOM.png')
]
export const PLAY_MODE_NAME = ['单曲循环', '顺序播放', '随机播放']
export const SINGLE = 0
export const SEQUENTIAL = 1
export const RANDOM = 2
export const DEFAULT_IMG = require('../assets/default-img.png')
export const PLAY_IMG = require('../assets/icon-play.png')
export const PAUSE_IMG = require('../assets/icon-pause.png')
export const NEXT_IMG = require('../assets/icon-next.png')
export const PREV_IMG = require('../assets/icon-prev.png')
export const PLAYLIST_IMG = require('../assets/icon-playlist.png')
export const DEFAULT_SONG_NAME = 'VUE QQ MUSIC'
export const DEFAULT_SONG_MID = ''
export const DEFAULT_SONG_DATAURL = ''
export const API_TRANSFER_URL = "http://127.0.0.1:3000";
//由于QQ音乐做了referer验证，所以需要伪造headers的中转服务器
export const types = {
  ALBUM: 10002,
  CD: 10014,
  JUMP: 3002
}
export const DEFAULT_SONG = {
  "id": 694646,
  "type": 0,
  "songtype": 13,
  "mid": "0048ukdm41wbsh",
  "name": "Mr Lonely",
  "title": "Mr Lonely (Live)",
  "subtitle": "",
  "interval": 346,
  "isonly": 1,
  "language": 3,
  "genre": 1,
  "index_cd": 2,
  "index_album": 31,
  "status": 0,
  "fnote": 4009,
  "url": "http://stream7.qqmusic.qq.com/12694646.wma",
  "time_public": "2010-06-28",
  "singer": [{
    "id": 143,
    "mid": "003Nz2So3XXYek",
    "name": "陈奕迅",
    "title": "陈奕迅"
  }],
  "album": {
    "id": 58757,
    "mid": "002gBayj0ZPoR0",
    "name": "DUO 陈奕迅2010演唱会",
    "title": "DUO 陈奕迅2010演唱会",
    "subtitle": ""
  },
  "mv": {
    "id": 68906,
    "vid": "g0090qTPM1T"
  },
  "ksong": {
    "id": 0,
    "mid": "004QWxzh4Ge6sX"
  },
  "file": {
    "media_mid": "0048ukdm41wbsh",
    "size_try": 0,
    "try_begin": 0,
    "try_end": 0,
    "size_24aac": 1107061,
    "size_48aac": 2211408,
    "size_96aac": 4274511,
    "size_192aac": 8296182,
    "size_192ogg": 7675471,
    "size_128mp3": 5542182,
    "size_320mp3": 13831554,
    "size_aac": 2211408,
    "size_ogg": 7675471,
    "size_128": 5542182,
    "size_320": 13831554,
    "size_ape": 34838460,
    "size_flac": 36429281,
    "size_dts": 0
  },
  "volume": {
    "gain": 0,
    "peak": 0,
    "lra": 0
  },
  "pay": {
    "pay_month": 1,
    "price_track": 200,
    "price_album": 0,
    "pay_play": 0,
    "pay_down": 1,
    "pay_status": 0,
    "time_free": 0
  },
  "action": {
    "switch": 636675,
    "msgid": 14,
    "msgpay": 6,
    "alert": 100002,
    "icons": 8060
  }
}
