<template>
  <h2>这里是 Index 的内容</h2>
</template>

<script lang="babel">
import * as api from 'src/api.js'

export default {
  name: 'Index',
  ready () {
    this.reqFirst()
  },
  methods: {
    reqFirst () {
      const that = this
      this.$http({
        url: api.getUrl,
        method: 'GET'
      }).then(res => {
        console.log(that.$route.path)
        that.$route.router.go(res.data.codeUrl)
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>