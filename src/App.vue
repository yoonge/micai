<template>
  <div class="app">
    <router-view
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  ready () {
    this.reqFirst()
  },
  methods: {
    reqFirst () {
      this.$http({
        url: 'http://www.91micai.com/portal/weixinPublic/weixinToLogin.do',
        method: 'POST'
      }).then(res => {
        window.alert(res.data.codeUrl)
        window.location.href = res.data.codeUrl
      }).catch(err => {
        console.error(err.data)
      })
    }
  }
}
</script>