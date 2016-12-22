<template>
</template>

<script>
export default {
  name: 'Next',
  ready () {
    this.reqSecond()
  },
  methods: {
    reqSecond () {
      const code = this.getRequest('code')
      window.alert(code)
      this.$http({
        url: 'http://www.91micai.com/portal/weixinPublic/login.do',
        params: {
          code: code
        },
        method: 'GET'
      }).then(res => {
        window.alert(res.data)
        if (res.data.stype === '1') {
          window.location.href = '/portal/content/weixinPublic/vue/login'
        } else if (res.data.stype === '0') {
          window.location.href = '/portal/content/weixinPublic/vue/homepage'
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