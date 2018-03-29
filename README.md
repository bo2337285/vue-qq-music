# vue-qq-music

> 用 vue2 + vux 实现一个带播放器的qq音乐，有参考

# 关于qq音乐api

> 由于qq音乐的api需要验证referer，故需要起一个server来中转，server目录内有个简单的中转服务器，需自行手动启动，默认监听3000端口，调用中转的地址在.\src\config\def.js内配置。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

