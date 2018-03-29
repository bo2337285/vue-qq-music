var request = require('request');

var urlEncode = function (url, data) {
    if (typeof (url) == 'undefined' || url == null || url == '') {
        return '';
    }
    if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
        return '';
    }
    url += (url.indexOf("?") != -1) ? "" : "?";
    for (var k in data) {
        url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
        // console.log(url);
    }
    return url;
}

module.exports = function (url,header,params,callback) {
    return request({
        method: 'get',
        url: urlEncode(url, params),
        headers: header
    },callback)
}