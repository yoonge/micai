<template>
  <div class="wage">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'Wage'
}
</script>

<style lang="less">
.wage {
  width: 100%;
  height: 100%;
}
</style>
