export default {
    listenCount: num => {
        return Math.round(num / 1000) / 10 + '万'
      }
}