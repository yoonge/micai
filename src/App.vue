<template>
  <div id="app">
    <loading :show="loading" :text="text1"></loading>
    <x-header :left-options="{ showBack: true }" :right-options="{ showMore: true }" style="background-color:#000;">信果</x-header>
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

body {
  background-color: #fbf9fe;
}
</style>

