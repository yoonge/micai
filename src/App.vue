<template>
  <div id="app">
    <loading :show="loading" :text="text1"></loading>
    <x-header class="x-header" :left-options="{ showBack: true }" :right-options="{ showMore: true }">蜜才</x-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from 'vux-components/loading'
import XHeader from 'vux-components/x-header'

export default {
  components: {
    Loading,
    XHeader
  },
  data () {
    return {
      loading: true,
      text1: 'Loading...'
    }
  },
  ready () {
    this.showChange()
  },
  methods: {
    showChange () {
      tick(0, (percent) => {
        if (percent === 100) {
          this.loading = false
          return
        }
      })
    }
  }
}

function tick (i, cb) {
  setTimeout(function () {
    i++
    cb(i)
    if (i < 100) {
      tick(i, cb)
    }
  }, 20)
}
</script>

<style lang="less">
@import '~vux/src/styles/reset';

html,
body {
  font-family: -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "PingFang TC", "Hiragino Sans GB", "Microsoft YaHei", "Microsoft JhengHei", sans-serif;
  width: 100%;
  height: 100%;
  min-height: 568px;
}
body {
  background-image: url('./assets/login_bg@2x.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
}
.x-header {
  background-color: #000 !important;
}
</style>

