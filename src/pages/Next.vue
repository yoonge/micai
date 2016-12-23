<template>
  <h2>这里是 Next 的内容</h2>
</template>

<script lang="babel">
import * as api from 'src/api.js'

export default {
  name: 'Next',
  ready () {
    this.reqSecond()
  },
  methods: {
    reqSecond () {
      // const code = this.getRequest('code')
      const code = '1234567890'
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
    }
    // getRequest (key) {
    //   const url = window.location.search
    //   let theRequest = {}
    //   if (url.indexOf('?') !== -1) {
    //     let str = url.substr(1)
    //     let strs = str.split('&')
    //     for (let i = 0; i < strs.length; i++) {
    //       theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    //     }
    //   }
    //   return theRequest[key]
    // }
  }
}
</script>