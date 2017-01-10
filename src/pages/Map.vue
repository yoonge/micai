<template>
  <div class="map">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Map'
}
</script>

<style lang="less">
.map {
  width: 100%;
  height: 100%;
}
</style>




