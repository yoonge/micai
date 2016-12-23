<template>
  <h1 style="display: none;">Index</h1>
</template>

<script lang="babel">
import * as api from 'src/api.js'

export default {
  name: 'Index',
  ready () {
    if (this.getRequest('code')) {
      this.reqSecond()
    } else {
      this.reqFirst()
    }
  },
  methods: {
    reqFirst () {
      this.$http({
        url: api.getUrl,
        method: 'GET'
      }).then(res => {
        window.location.href = res.data.codeUrl
      }).catch(err => {
        console.error(err.data)
      })
    },
    reqSecond () {
      const code = this.getRequest('code')
      const that = this
      this.$http({
        url: api.getUserInfo,
        params: {
          code: code
        },
        method: 'GET'
      }).then(res => {
        if (res.data.stype === '1') {
          that.$route.router.go('/login')
        } else if (res.data.stype === '0') {
          that.$route.router.go('/homepage')
        }
      }).catch(err => {
        console.error(err.data)
      })
    },
    getRequest (key) {
      const url = window.location.search
      let theRequest = {}
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest[key]
    }
  }
}
</script>