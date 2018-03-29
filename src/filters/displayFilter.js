export default {
    subTitle: text => {
        return text.trim().length>0 ? " - " + text: text;
      },
    singerName: singerList => {
        return singerList.length>0 ? singerList[0].name : "佚名";
      }
}