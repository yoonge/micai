<template>
</template>

<script>
export default {
  name: 'Index',
  ready () {
    if (window.localStorage.getItem('visited')) {
      this.reqSecond()
    } else {
      this.reqFirst()
    }
  },
  methods: {
    reqFirst () {
      this.$http({
        url: 'http://www.91micai.com/portal/weixinPublic/weixinToLogin.do',
        method: 'POST'
      }).then(res => {
        console.log(res.data)
        if (res.data) {
          window.localStorage.setItem('visited', 'true')
        }
        window.alert(res.data)
        window.location.href = res.data.codeUrl
      }).catch(err => {
        console.error(err.data)
      })
    },
    reqSecond () {
      window.alert(window.location.search)
      const code = this.getRequest('code')
      window.alert(code)
      this.$http({
        url: 'http://www.91micai.com/portal/weixinPublic/login.do',
        data: {
          code: code
        },
        method: 'GET'
      }).then(res => {
        console.log(res.data)
        // window.localStorage.removeItem('visited')
        window.alert(res.data)
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