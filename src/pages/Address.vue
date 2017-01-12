<template>
  <div class="address">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Address'
}
</script>

<style lang="less">
.address {
  width: 100%;
  height: 100%;
}
</style>