<template>
  <div class="notice">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Notice'
}
</script>

<style lang="less">
.notice{
  width: 100%;
  height: 100%;
}
</style>
