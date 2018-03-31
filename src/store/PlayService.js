import * as def from '../config/def'

export default {
  state: {
    playing: false,
    play_full: false,
    setCurrentTime: 0,
    currentTime: 0,
    playProcess:0,
    duration: 0,
    playMode: def.SEQUENTIAL,
    index: 0,
    song: {
      name: def.DEFAULT_SONG_NAME,
      mid: def.DEFAULT_SONG_MID,
      album:{}
    },
    playList: []
  },
  mutations: {
    playIndex (state, index) {
      state.index = index
      state.song = Object.assign({},state.playList[index])
    },
    setPlayList (state, playList) {
      state.playList = playList.list
      state.index = playList.index
      state.song = Object.assign(state.playList[state.index])
    },
    addToPlayList (state, item) {
      state.playList.push(item)
    },
    concatToPlayList (state, playList) {
      state.playList = state.playList.concat([],playList)
    },
    deleteFromPlayList (state, index) {
      if (isNaN(index) || index >= state.playList.length) {
        return false
      }
      if (index === state.index) {
        if (state.index === 0 && state.playList.length === 1) {
          state.song = {
            name: def.DEFAULT_SONG_NAME,
            singer: ''
          }
          state.coverImgUrl = def.DEFAULT_IMG
        } else {
          state.song = Object.assign(state.playList[state.index + 1])
        }
      } else if (index < state.index) {
        state.index--
      }
      state.playList.splice(index, 1)

    },
    addToPlayListAsNextPlay (state, item) {
      state.playList.splice(state.index + 1, 0, item)
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDuration (state, time) {
      state.duration = time
    },
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    playFullEnable (state) {
      state.play_full = true
    },
    playFullDisable (state) {
      state.play_full = false
    },
    playPrev (state) {
      state.index = (state.index - 1 + state.playList.length) % state.playList.length
      state.song = Object.assign(state.playList[state.index])
    },
    playNext (state) {
      state.index = (state.index + 1) % state.playList.length
      state.song = Object.assign(state.playList[state.index])
    },
    playContinue (state) {
      switch (state.playMode) {
        case def.SINGLE:
          break
        case def.SEQUENTIAL:
          state.index = (state.index + 1) % state.playList.length
          state.song = Object.assign(state.playList[state.index])
          break
        case def.RANDOM:
          state.index = Math.floor(Math.random() * state.playList.length)
          state.song = Object.assign(state.playList[state.index])
          break
      }
    },
    playStart (state){
      state.setCurrentTime = 0
      state.playing = true
    },
    playEnd (state){
      state.setCurrentTime = state.duration
      state.playing = false;
    },
    changePlayMode (state) {
      state.playMode = (state.playMode + 1) % 3
    },
    setAlbummid(state,albummid){
      state.song = {...state.song,albummid}
    },
    updateProcess (state , val){
      state.setCurrentTime = val * state.duration
      state.currentTime = state.setCurrentTime
      // console.log(state.currentTime)
    }
  },
  getters: {
    currentTime: state =>{
      return parseInt(state.currentTime / 60) + ':' + (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
    },
    duration: state =>{
      return parseInt(state.duration / 60) + ':' + (Array(2).join(0) + (state.duration % 60)).slice(-2)
    },
    playProcess: state =>{
      return state.currentTime /state.duration;
    },
    dataUrl: state =>{
      if(!!state.song.mid && !!state.song.mid.trim().length){
        return 'https://dl.stream.qqmusic.qq.com/C100' + state.song.mid + '.m4a?fromtag=46'
      }else{
        return ""
      }
    },
    coverImgUrl:state => {
      if(!!state.song.album && !!state.song.album.mid )
        return "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+state.song.album.mid+".jpg"
      else
        return def.DEFAULT_IMG
    }
  }
}
