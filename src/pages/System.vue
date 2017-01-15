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
  min-width: 100%;
  min-height: 100%;
}
</style>
