export const PLAY_MODE_IMG = [
  require('../assets/icon-SINGLE.svg'),
  require('../assets/icon-SEQUENTIAL.png'),
  require('../assets/icon-RANDOM.png')
]
export const PLAY_MODE_NAME = ['单曲循环', '顺序播放', '随机播放']
export const SINGLE = 0
export const SEQUENTIAL = 1
export const RANDOM = 2
export const DEFAULT_IMG = require('../assets/Vue_Music_Blur.png')
export const DEFAULT_SONG_NAME = 'VUE QQ MUSIC'
export const DEFAULT_SONG_DATAURL = ''
export const API_TRANSFER_URL = "http://127.0.0.1:3000";
//由于QQ音乐做了referer验证，所以需要伪造headers的中转服务器
export const types = {
  ALBUM: 10002,
  CD: 10014,
  JUMP: 3002
}
