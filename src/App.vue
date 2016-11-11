<template>
  <div id="app">
    <spinner class="x-spinner" :type="type" :show="loading"></spinner>
    <x-header :left-options="{ showBack: true }" :right-options="{ showMore: true }" style="background-color:#000;">信果</x-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Spinner from 'vux-components/spinner'
import XHeader from 'vux-components/x-header'

export default {
  components: {
    Spinner,
    XHeader
  },
  data () {
    return {
      type: 'bubbles',
      loading: true
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

body {
  background-color: #fbf9fe;
}
.x-spinner {
  margin-top: -14px;
  margin-left: -14px;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

