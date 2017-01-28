<template>
  <div class="system">
    <router-view
      transition="slide"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script lang="babel">
export default {
  name: 'System'
}
</script>

<style lang="less">
.system{
  width: 100%;
  height: 100%;
}
</style>
