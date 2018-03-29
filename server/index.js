var express = require('express');
var app = express();
var test = require('./test');

app.get('/', function (req, res) {
    var req_params = req.query
    var _res = res
    test(req_params.url,req_params.headers,req_params.params,function (error, response, body) {
        req_params.params.format == 'jsonp'?
        _res.send(body) :
        _res.send(req_params[req_params.jsonp] + '('+body+')')
    })
});
var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Example app listening at http://127.0.0.1:%s', port);
});