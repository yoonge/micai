<template>
  <div class="home">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Home'
}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>




