<template>
  <div id="app">
    <loading :show="loading" :text="textLoading"></loading>
    <!-- <x-header class="xg-header" :left-options="{ showBack: true }" :right-options="{ showMore: true }">蜜才</x-header> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from 'vux-components/loading'
// import XHeader from 'vux-components/x-header'

export default {
  components: {
    Loading
  },
  data () {
    return {
      loading: true,
      textLoading: 'Loading...'
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
  }, 10)
}
</script>

<style lang="less">
@import '~vux/src/styles/reset';
@import 'styles/reset';
@import 'styles/icon';

html,
body {
  font-family: -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "PingFang TC", "Hiragino Sans GB", "Microsoft YaHei", "Microsoft JhengHei", sans-serif !important;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.xg-header {
  background-color: #000 !important;
}
</style>

